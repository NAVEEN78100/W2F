import express from "express";
import TopicFeedback from "../models/TopicFeedback.js";

const router = express.Router();

// POST /api/topic-feedback - Submit topic feedback
router.post("/", async (req, res) => {
  try {
    const { topicSlug, helpful } = req.body;

    if (!topicSlug || !helpful) {
      return res.status(400).json({
        message: "topicSlug and helpful are required",
      });
    }

    const userAgent = req.get("User-Agent") || "";
    const ipAddress = req.ip || req.connection.remoteAddress || "";

    const feedback = new TopicFeedback({
      topicSlug,
      helpful,
      userAgent,
      ipAddress,
    });

    await feedback.save();

    res.status(201).json({
      message: "Topic feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    console.error("Error submitting topic feedback:", error);
    res.status(500).json({
      message: "Failed to submit topic feedback",
      error: error.message,
    });
  }
});

// GET /api/topic-feedback - Get all topic feedback
router.get("/", async (req, res) => {
  try {
    const feedback = await TopicFeedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    console.error("Error fetching topic feedback:", error);
    res.status(500).json({
      message: "Failed to fetch topic feedback",
      error: error.message,
    });
  }
});

// GET /api/topic-feedback/stats - Get topic feedback statistics
router.get("/stats", async (req, res) => {
  try {
    const totalFeedback = await TopicFeedback.countDocuments();
    const helpfulCount = await TopicFeedback.countDocuments({ helpful: "Yes" });
    const notHelpfulCount = await TopicFeedback.countDocuments({ helpful: "No" });

    res.json({
      total: totalFeedback,
      helpful: helpfulCount,
      notHelpful: notHelpfulCount,
      helpfulPercentage: totalFeedback > 0 ? ((helpfulCount / totalFeedback) * 100).toFixed(1) : 0,
    });
  } catch (error) {
    console.error("Error fetching topic feedback stats:", error);
    res.status(500).json({
      message: "Failed to fetch topic feedback stats",
      error: error.message,
    });
  }
});

export default router;
