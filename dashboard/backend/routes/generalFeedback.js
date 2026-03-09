import express from "express";
import GeneralFeedback from "../models/GeneralFeedback.js";
import ReferralCode from "../models/ReferralCode.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Generate unique ticket ID for feedback
const generateTicketId = async (type = "F") => {
  const year = new Date().getFullYear().toString().slice(-2); // Last 2 digits of year
  const lastFeedback = await GeneralFeedback.findOne(
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
    }
  }
  return `W2F-${year}-${type}-${counter.toString().padStart(5, "0")}`;
};

// Generate unique referral code
const generateReferralCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `WWF-${code}`;
};

// POST /api/general-feedback
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      state,
      city,
      section,
      feedbackType,
      feedbackDetails,
    } = req.body;

    console.log("General feedback request received:", {
      name,
      email,
      contact,
      state,
      city,
      feedbackType,
      feedbackDetailsLength: feedbackDetails?.length,
    });

    const ticketId = await generateTicketId("F");

    // Generate referral code
    let referralCode = null;
    try {
      const code = generateReferralCode();
      const newReferralCode = new ReferralCode({
        code,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      });
      await newReferralCode.save();
      referralCode = code;
    } catch (codeErr) {
      console.warn("Failed to generate referral code:", codeErr.message);
      // Continue without referral code if generation fails
    }

    const feedbackData = {
      name,
      email,
      contact,
      state,
      city,
      section,
      feedbackType,
      feedbackDetails,
      ticketId,
      referralCode,
    };

    const feedback = new GeneralFeedback(feedbackData);
    await feedback.save();

    res.status(201).json({
      ticketId,
      referralCode,
      message: "Feedback submitted successfully"
    });
  } catch (error) {
    console.error("Error submitting general feedback:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ error: error.message || "Failed to submit feedback" });
  }
});

// GET /api/general-feedback (for admin)
router.get("/", async (req, res) => {
  try {
    const feedbacks = await GeneralFeedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching general feedbacks:", error);
    res.status(500).json({ error: "Failed to fetch general feedbacks" });
  }
});

// PUT /api/general-feedback/:id/status (for admin)
router.put("/:id/status", async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const feedback = await GeneralFeedback.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    );
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.json(feedback);
  } catch (error) {
    console.error("Error updating feedback status:", error);
    res.status(500).json({ error: "Failed to update feedback status" });
  }
});

// POST /api/general-feedback/use-referral
router.post("/use-referral", async (req, res) => {
  try {
    const { code, email } = req.body;

    if (!code || !email) {
      return res.status(400).json({ error: "Code and email are required" });
    }

    const referralCode = await ReferralCode.findOne({
      code: code.toUpperCase(),
      isUsed: false,
      expiresAt: { $gt: new Date() }
    });

    if (!referralCode) {
      return res.status(400).json({ error: "Invalid or expired referral code" });
    }

    // Mark code as used
    referralCode.isUsed = true;
    referralCode.usedBy = email;
    referralCode.usedAt = new Date();
    await referralCode.save();

    // Here you would typically update user points in your user system
    // For now, just return success
    res.json({
      success: true,
      message: "Referral code redeemed successfully",
      points: 10 // Example points
    });
  } catch (error) {
    console.error("Error using referral code:", error);
    res.status(500).json({ error: "Failed to redeem referral code" });
  }
});

// GET /api/general-feedback/referral-logs
router.get("/referral-logs", async (req, res) => {
  try {
    const referralLogs = await ReferralCode.find().sort({ createdAt: -1 });
    res.json(referralLogs);
  } catch (error) {
    console.error("Error fetching referral logs:", error);
    res.status(500).json({ error: "Failed to fetch referral logs" });
  }
});

export default router;
