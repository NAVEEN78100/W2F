import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import BugBounty from "../models/BugBounty.js";
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
      ["image/jpeg", "image/png"].includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PNG, JPG allowed."));
    }
  },
});

// Generate ticket ID for bug bounty
const generateTicketId = async (type = "BB") => {
  const year = "26";
  const lastBugBounty = await BugBounty.findOne(
    {},
    {},
    { sort: { createdAt: -1 } },
  );
  let counter = 1;
  if (lastBugBounty) {
    const lastTicketId = lastBugBounty.ticketId;
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
  return `W2F-${year}-${type}-${counter.toString().padStart(4, "0")}`;
};

// POST /api/bug-bounty
router.post("/", upload.single("referenceFile"), async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      state,
      city,
      operatingSystem,
      bugDescription,
      ticketId,
    } = req.body;

    console.log("Bug bounty request received:", {
      name,
      email,
      contact,
      state,
      city,
      operatingSystem,
      bugDescriptionLength: bugDescription?.length,
      fileSize: req.file?.size,
    });

    const bugBountyData = {
      name,
      email,
      contact,
      state,
      city,
      operatingSystem,
      bugDescription,
      referenceFile: req.file ? req.file.path : null,
      ticketId: ticketId || await generateTicketId("BB"),
    };

    const bugBounty = new BugBounty(bugBountyData);
    await bugBounty.save();

    res.status(201).json({
      message: "Bug bounty report submitted successfully",
      ticketId: bugBountyData.ticketId
    });
  } catch (error) {
    console.error("Error submitting bug bounty:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ error: error.message || "Failed to submit bug bounty report" });
  }
});

// GET /api/bug-bounty-ticket - Generate ticket ID
router.get("/ticket", async (req, res) => {
  try {
    const ticketId = await generateTicketId("BB");
    res.json({ ticketId });
  } catch (error) {
    console.error("Error generating ticket ID:", error);
    res.status(500).json({ error: "Failed to generate ticket ID" });
  }
});

// GET /api/bug-bounty (for admin)
router.get("/", async (req, res) => {
  try {
    const bugBounties = await BugBounty.find().sort({ createdAt: -1 });
    res.json(bugBounties);
  } catch (error) {
    console.error("Error fetching bug bounties:", error);
    res.status(500).json({ error: "Failed to fetch bug bounties" });
  }
});

// PATCH /api/bug-bounty/:id/status - Update bug bounty status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    const bugBounty = await BugBounty.findByIdAndUpdate(
      req.params.id,
      {
        status,
        adminNotes,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!bugBounty) {
      return res.status(404).json({ error: "Bug bounty not found" });
    }

    res.json(bugBounty);
  } catch (error) {
    console.error("Error updating bug bounty status:", error);
    res.status(500).json({ error: "Failed to update bug bounty status" });
  }
});

export default router;
