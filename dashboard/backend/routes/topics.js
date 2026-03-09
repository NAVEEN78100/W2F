import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Topic from "../models/Topic.js";
import { auth } from "../middleware/auth.js";
import { extractTextFromPDF } from "../utils/pdfProcessor.js";

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

const router = express.Router();

// Get all topics
router.get("/", async (req, res) => {
  try {
    const topics = await Topic.find().sort({ position: 1, createdAt: -1 });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get published topics
router.get("/published", async (req, res) => {
  try {
    const topics = await Topic.find({ is_published: true }).sort({
      position: 1,
    });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get topic by slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const topic = await Topic.findOne({ slug: req.params.slug });
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get single topic
router.get("/:id", async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Temporary PDF upload and extract text (for new quick questions before creation - admin only)
// MUST be before /:topicId routes to avoid route collision
router.post(
  "/temp-upload-pdf",
  auth,
  upload.single("pdf"),
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No PDF file provided" });
      }

      console.log("PDF upload started for file:", req.file.originalname);

      // Extract text from PDF
      let extractedText = await extractTextFromPDF(req.file.path);

      // Limit the extracted text to 50KB to avoid document size issues
      const MAX_TEXT_SIZE = 50000; // 50KB
      if (extractedText.length > MAX_TEXT_SIZE) {
        console.warn(
          `PDF text truncated from ${extractedText.length} to ${MAX_TEXT_SIZE} characters`,
        );
        extractedText =
          extractedText.substring(0, MAX_TEXT_SIZE) + "... [Text truncated]";
      }

      // Clean up the uploaded file after extraction
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      console.log(
        "PDF text extracted successfully, length:",
        extractedText.length,
      );

      res.json({
        message: "PDF uploaded and text extracted successfully",
        extracted_text: extractedText,
      });
    } catch (error) {
      console.error("Error uploading PDF:", error);
      console.error("Error message:", error.message);

      // Clean up the uploaded file if there's an error
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res
        .status(400)
        .json({ message: error.message || "Failed to upload PDF" });
    }
  },
);

// Create topic (admin only)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    console.log("Creating topic with data:", JSON.stringify(req.body, null, 2));

    // Validate quickQuestions
    if (req.body.quickQuestions && Array.isArray(req.body.quickQuestions)) {
      console.log("Quick questions count:", req.body.quickQuestions.length);
      req.body.quickQuestions.forEach((q, i) => {
        console.log(
          `Question ${i}: question="${q.question}", pdfText length=${q.pdfText ? q.pdfText.length : 0}`,
        );
        if (q.helpChosenForYou && q.helpChosenForYou.length > 0) {
          console.log(
            `  Help items for question ${i}:`,
            q.helpChosenForYou.length,
          );
          q.helpChosenForYou.forEach((h, j) => {
            console.log(
              `    Help item ${j}: title="${h.title}", description="${h.description}"`,
            );
          });
        }
      });
    }

    const topicData = {
      name: req.body.name,
      description: req.body.description,
      icon: req.body.icon,
      is_published: req.body.is_published,
      quickQuestions: req.body.quickQuestions || [],
      additionalQA: req.body.additionalQA || [],
      position: req.body.position,
    };

    console.log("Topic data to save:", JSON.stringify(topicData, null, 2));

    const topic = new Topic(topicData);
    const savedTopic = await topic.save();

    console.log("Topic created successfully:", savedTopic._id);
    console.log("Saved topic data:", JSON.stringify(savedTopic, null, 2));
    res.status(201).json(savedTopic);
  } catch (error) {
    console.error("Error creating topic:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }

    res
      .status(500)
      .json({ message: error.message || "Failed to create topic" });
  }
});

// Update topic (admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    console.log("Updating topic:", req.params.id);
    console.log("Update data received:", JSON.stringify(req.body, null, 2));

    const topic = await Topic.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          icon: req.body.icon,
          is_published: req.body.is_published,
          quickQuestions: req.body.quickQuestions || [],
          additionalQA: req.body.additionalQA || [],
        },
      },
      { new: true, runValidators: false },
    );

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    console.log("Topic updated successfully:", topic._id);
    console.log("Updated topic data:", JSON.stringify(topic, null, 2));
    res.json(topic);
  } catch (error) {
    console.error("Error updating topic:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }

    res
      .status(500)
      .json({ message: error.message || "Failed to update topic" });
  }
});

// Delete topic (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json({ message: "Topic deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Reorder topics (admin only)
router.put("/reorder", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { topics } = req.body;

    for (let i = 0; i < topics.length; i++) {
      await Topic.findByIdAndUpdate(topics[i]._id, { position: i });
    }

    res.json({ message: "Topics reordered" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Upload PDF and extract text for quick question (admin only)
router.post(
  "/:topicId/quick-questions/:questionIndex/upload-pdf",
  auth,
  upload.single("pdf"),
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No PDF file provided" });
      }

      const topic = await Topic.findById(req.params.topicId);
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }

      const questionIndex = parseInt(req.params.questionIndex) - 1;
      if (questionIndex < 0 || questionIndex >= topic.quickQuestions.length) {
        return res.status(400).json({ message: "Invalid question index" });
      }

      // Extract text from PDF
      const extractedText = await extractTextFromPDF(req.file.path);

      // Update the specific quick question with extracted text
      topic.quickQuestions[questionIndex].pdfText = extractedText;
      await topic.save();

      res.json({
        message: "PDF uploaded and text extracted successfully",
        extracted_text: extractedText,
      });
    } catch (error) {
      console.error("Error uploading PDF:", error);
      res
        .status(500)
        .json({ message: error.message || "Failed to upload PDF" });
    }
  },
);

// Upload PDF and extract text for help item in quick question (admin only)
router.post(
  "/:topicId/quick-questions/:questionIndex/help-items/:itemIndex/upload-pdf",
  auth,
  upload.single("pdf"),
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No PDF file provided" });
      }

      const topic = await Topic.findById(req.params.topicId);
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }

      const questionIndex = parseInt(req.params.questionIndex) - 1;
      if (questionIndex < 0 || questionIndex >= topic.quickQuestions.length) {
        return res.status(400).json({ message: "Invalid question index" });
      }

      const itemIndex = parseInt(req.params.itemIndex) - 1;
      if (
        !topic.quickQuestions[questionIndex].helpChosenForYou ||
        itemIndex < 0 ||
        itemIndex >= topic.quickQuestions[questionIndex].helpChosenForYou.length
      ) {
        return res.status(400).json({ message: "Invalid help item index" });
      }

      // Extract text from PDF
      const extractedText = await extractTextFromPDF(req.file.path);

      // Update the specific help item with extracted text
      topic.quickQuestions[questionIndex].helpChosenForYou[itemIndex].content =
        extractedText;
      topic.quickQuestions[questionIndex].helpChosenForYou[itemIndex].pdf_url =
        req.file.filename;
      await topic.save();

      res.json({
        message: "PDF uploaded and text extracted successfully",
        extracted_text: extractedText,
      });
    } catch (error) {
      console.error("Error uploading PDF:", error);
      res
        .status(500)
        .json({ message: error.message || "Failed to upload PDF" });
    }
  },
);

export default router;
