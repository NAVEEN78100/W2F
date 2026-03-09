import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import SupportFeedback from "../models/SupportFeedback.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "backend", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
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
  limits: { fileSize: 100 * 1024 }, // 100KB
  fileFilter: (req, file, cb) => {
    if (
      ["image/jpeg", "image/png", "application/pdf"].includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF, PNG, JPG allowed."));
    }
  },
});

// POST /api/support-feedback
const generateTicketId = async (type = "F") => {
  const year = "26";
  const lastFeedback = await SupportFeedback.findOne(
    {},
    {},
    { sort: { createdAt: -1 } },
  );
  let counter = 1;
  if (lastFeedback) {
    const lastTicketId = lastFeedback.ticketId;
    if (lastTicketId) {
      const parts = lastTicketId.split("-");
      if (
        parts.length === 4 &&
        parts[1] === year.toString() &&
        parts[2] === type
      ) {
        counter = parseInt(parts[3]) + 1;
      }
      // If the last ticket was a different type, start from 1 for the new type
      // No change needed here as counter is already initialized to 1
    }
  }
  return `W2F-${year}-${type}-${counter.toString().padStart(5, "0")}`;
};

// POST /api/support-feedback
router.post("/", upload.single("evidence"), async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      state,
      city,
      platform,
      issueCategory,
      elaboration,
    } = req.body;

    console.log("Support feedback request received:", {
      name,
      email,
      contact,
      state,
      city,
      platform,
      issueCategory,
      elaborationLength: elaboration?.length,
      fileSize: req.file?.size,
    });

    const ticketId = await generateTicketId("CS");

    const feedbackData = {
      name,
      email,
      contact,
      state,
      city,
      platform,
      issueCategory,
      elaboration,
      evidenceFile: req.file ? req.file.filename : null,
      ticketId,
    };

    const feedback = new SupportFeedback(feedbackData);
    await feedback.save();

    res.status(201).json({ ticketId });
  } catch (error) {
    console.error("Error submitting support feedback:", error.message);
    console.error("Full error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to submit support request" });
  }
});

// GET /api/support-feedback (for admin)
router.get("/", async (req, res) => {
  try {
    const feedbacks = await SupportFeedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching support feedbacks:", error);
    res.status(500).json({ error: "Failed to fetch support feedbacks" });
  }
});

// PUT /api/support-feedback/:feedbackId/status - Update support feedback status (admin)
router.put("/:feedbackId/status", async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const validStatuses = ["pending", "in_review", "resolved", "closed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const feedback = await SupportFeedback.findByIdAndUpdate(
      req.params.feedbackId,
      {
        status,
        adminNotes: adminNotes || undefined,
      },
      { new: true, runValidators: true },
    );

    if (!feedback) {
      return res.status(404).json({ message: "Support feedback not found" });
    }

    res.json({
      message: "Support feedback status updated successfully",
      feedback,
    });
  } catch (error) {
    console.error("Error updating support feedback status:", error);
    res
      .status(500)
      .json({ message: "Failed to update support feedback status" });
  }
});

export default router;
