import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Article from "../models/Article.js";
import { auth } from "../middleware/auth.js";
import { extractTextFromPDF } from "../utils/pdfProcessor.js";

const router = express.Router();

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
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
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

// Get all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ position: 1, createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get published articles
router.get("/published", async (req, res) => {
  try {
    const articles = await Article.find({ is_published: true }).sort({
      position: 1,
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get single article by slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Temporary PDF upload and extract text (for new articles before creation - admin only)
// MUST be before /:id routes to avoid route collision
router.post("/temp-upload-pdf", auth, upload.single("pdf"), async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No PDF file provided" });
    }

    // Extract text from PDF
    const extractedText = await extractTextFromPDF(req.file.path);

    res.json({
      message: "PDF uploaded and text extracted successfully",
      pdf_url: `/uploads/${req.file.filename}`,
      extracted_text: extractedText,
    });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    res.status(500).json({ message: "Failed to upload PDF" });
  }
});

// Get single article
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create article (admin only)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update article (admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete article (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json({ message: "Article deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Reorder articles (admin only)
router.put("/reorder", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { articles } = req.body;

    for (let i = 0; i < articles.length; i++) {
      await Article.findByIdAndUpdate(articles[i]._id, { position: i });
    }

    res.json({ message: "Articles reordered" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Upload PDF and extract text (admin only)
router.post("/:id/upload-pdf", auth, upload.single("pdf"), async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No PDF file provided" });
    }

    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Extract text from PDF
    const extractedText = await extractTextFromPDF(req.file.path);

    // Update article with PDF URL and extracted content
    article.pdf_url = `/uploads/${req.file.filename}`;
    if (!article.content) {
      article.content = extractedText;
    }
    await article.save();

    res.json({
      message: "PDF uploaded and text extracted successfully",
      pdf_url: article.pdf_url,
      extracted_text: extractedText,
    });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    res.status(500).json({ message: "Failed to upload PDF" });
  }
});

export default router;
