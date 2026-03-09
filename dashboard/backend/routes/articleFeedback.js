import express from "express";
import ArticleFeedback from "../models/ArticleFeedback.js";

const router = express.Router();

// POST /api/article-feedback - Submit article feedback
router.post("/", async (req, res) => {
  try {
    const { articleSlug, helpful } = req.body;

    if (!articleSlug || !helpful) {
      return res.status(400).json({
        message: "Article slug and helpful response are required",
      });
    }

    if (!["Yes", "No"].includes(helpful)) {
      return res.status(400).json({
        message: "Helpful must be either 'Yes' or 'No'",
      });
    }

    const feedback = new ArticleFeedback({
      articleSlug,
      helpful,
      userAgent: req.get("User-Agent") || "",
      ipAddress: req.ip || req.connection.remoteAddress || "",
    });

    await feedback.save();

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback: {
        id: feedback._id,
        articleSlug: feedback.articleSlug,
        helpful: feedback.helpful,
        createdAt: feedback.createdAt,
      },
    });
  } catch (error) {
    console.error("Error submitting article feedback:", error);
    res.status(500).json({
      message: "Failed to submit feedback",
      error: error.message,
    });
  }
});

// GET /api/article-feedback - Get all article feedback (admin only)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 20, articleSlug } = req.query;

    const query = {};
    if (articleSlug) {
      query.articleSlug = articleSlug;
    }

    const feedbacks = await ArticleFeedback.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select("-__v");

    const total = await ArticleFeedback.countDocuments(query);

    res.json({
      feedbacks,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error("Error fetching article feedback:", error);
    res.status(500).json({
      message: "Failed to fetch feedback",
      error: error.message,
    });
  }
});

// GET /api/article-feedback/stats - Get feedback statistics
router.get("/stats", async (req, res) => {
  try {
    const { articleSlug } = req.query;

    const matchStage = articleSlug ? { articleSlug } : {};

    const stats = await ArticleFeedback.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$helpful",
          count: { $sum: 1 },
        },
      },
    ]);

    const total = stats.reduce((sum, stat) => sum + stat.count, 0);
    const yesCount = stats.find((s) => s._id === "Yes")?.count || 0;
    const noCount = stats.find((s) => s._id === "No")?.count || 0;

    res.json({
      total,
      yes: yesCount,
      no: noCount,
      yesPercentage: total > 0 ? ((yesCount / total) * 100).toFixed(1) : "0.0",
      noPercentage: total > 0 ? ((noCount / total) * 100).toFixed(1) : "0.0",
    });
  } catch (error) {
    console.error("Error fetching feedback stats:", error);
    res.status(500).json({
      message: "Failed to fetch feedback stats",
      error: error.message,
    });
  }
});

export default router;
