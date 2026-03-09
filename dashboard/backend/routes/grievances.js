import express from "express";
import multer from "multer";
import path from "path";
import nodemailer from "nodemailer";
import fs from "fs";
import Grievance from "../models/Grievance.js";
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

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Generate ticket ID for grievances
const generateTicketId = async (type = "GR") => {
  const year = new Date().getFullYear();
  const lastGrievance = await Grievance.findOne(
    {},
    {},
    { sort: { createdAt: -1 } },
  );
  let counter = 1;
  if (lastGrievance) {
    const lastTicketId = lastGrievance.ticketId;
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

// POST /api/grievances - Submit a grievance
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
      incidentDate,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !contact ||
      !state ||
      !city ||
      !platform ||
      !issueCategory ||
      !elaboration
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const ticketId = await generateTicketId("GR");

    const grievanceData = {
      name,
      email,
      contact,
      state,
      city,
      platform,
      issueCategory,
      elaboration,
      incidentDate: incidentDate ? new Date(incidentDate) : null,
      evidenceFile: req.file ? req.file.filename : null,
      ticketId,
    };

    const grievance = new Grievance(grievanceData);
    await grievance.save();

    // Send confirmation email
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || "noreply@wanderwithfood.com",
        to: email,
        subject: `Grievance Ticket Confirmation - ${ticketId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
              <h2 style="color: #333; margin-bottom: 20px;">Grievance Submission Confirmation</h2>
              
              <p style="color: #666; font-size: 16px;">Dear <strong>${name}</strong>,</p>
              
              <p style="color: #666; margin: 15px 0;">Thank you for submitting your grievance to Wander With Food. We take your concerns very seriously and will investigate the matter thoroughly.</p>
              
              <div style="background-color: #fff; padding: 20px; border: 2px solid #e0e0e0; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Your Grievance Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px; color: #666; border-bottom: 1px solid #e0e0e0;"><strong>Ticket ID:</strong></td>
                    <td style="padding: 10px; color: #333; border-bottom: 1px solid #e0e0e0; font-weight: bold;">${ticketId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; color: #666; border-bottom: 1px solid #e0e0e0;"><strong>Category:</strong></td>
                    <td style="padding: 10px; color: #333; border-bottom: 1px solid #e0e0e0;">${issueCategory}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; color: #666; border-bottom: 1px solid #e0e0e0;"><strong>Platform:</strong></td>
                    <td style="padding: 10px; color: #333; border-bottom: 1px solid #e0e0e0;">${platform}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; color: #666;"><strong>Submitted On:</strong></td>
                    <td style="padding: 10px; color: #333;">${new Date().toLocaleDateString()}</td>
                  </tr>
                </table>
              </div>
              
              <p style="color: #666; margin: 15px 0;">Our grievance redressal team will review your submission and all supporting documents you have provided. You can expect a response within 5-7 business days.</p>
              
              <p style="color: #666; margin: 15px 0;"><strong>Please keep your Ticket ID (${ticketId}) for reference and future correspondence.</strong></p>
              
              <div style="background-color: #f0f8ff; padding: 15px; border-left: 4px solid #1877F2; margin: 20px 0;">
                <p style="color: #333; margin: 0;"><strong>Status:</strong> Your grievance is currently under review.</p>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
              
              <p style="color: #999; font-size: 12px; margin-top: 20px;">This is an automated message. Please do not reply to this email. For any updates on your grievance, please reference your ticket ID when contacting our support team.</p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Confirmation email sent to ${email}`);
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // Don't fail the request if email fails, just log the error
    }

    res.status(201).json({
      message: "Grievance submitted successfully",
      ticketId,
      grievanceId: grievance._id,
    });
  } catch (error) {
    console.error("Error submitting grievance:", error);
    res.status(500).json({
      message: error.message || "Failed to submit grievance",
    });
  }
});

// GET /api/grievances - Get all grievances (admin only)
router.get("/", async (req, res) => {
  try {
    const grievances = await Grievance.find().sort({ createdAt: -1 });
    res.json(grievances);
  } catch (error) {
    console.error("Error fetching grievances:", error);
    res.status(500).json({ message: "Failed to fetch grievances" });
  }
});

// GET /api/grievances/:ticketId - Get specific grievance details
router.get("/:ticketId", async (req, res) => {
  try {
    const grievance = await Grievance.findOne({
      ticketId: req.params.ticketId,
    });
    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }
    res.json(grievance);
  } catch (error) {
    console.error("Error fetching grievance:", error);
    res.status(500).json({ message: "Failed to fetch grievance" });
  }
});

// PATCH /api/grievances/:grievanceId/status - Update grievance status (admin)
router.patch("/:grievanceId/status", async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const validStatuses = ["pending", "in_review", "resolved", "closed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const grievance = await Grievance.findByIdAndUpdate(
      req.params.grievanceId,
      {
        status,
        adminNotes: adminNotes || undefined,
      },
      { new: true, runValidators: true },
    );

    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    // Send status update email to the user
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || "noreply@wanderwithfood.com",
        to: grievance.email,
        subject: `Grievance Status Update - ${grievance.ticketId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
              <h2 style="color: #333; margin-bottom: 20px;">Grievance Status Update</h2>
              
              <p style="color: #666; font-size: 16px;">Dear <strong>${grievance.name}</strong>,</p>
              
              <p style="color: #666; margin: 15px 0;">We have an update on your grievance submission.</p>
              
              <div style="background-color: #fff; padding: 20px; border: 2px solid #e0e0e0; border-radius: 8px; margin: 20px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px; color: #666; border-bottom: 1px solid #e0e0e0;"><strong>Ticket ID:</strong></td>
                    <td style="padding: 10px; color: #333; border-bottom: 1px solid #e0e0e0; font-weight: bold;">${grievance.ticketId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; color: #666;"><strong>Current Status:</strong></td>
                    <td style="padding: 10px; color: #333; font-weight: bold; text-transform: capitalize;">${status}</td>
                  </tr>
                </table>
              </div>
              
              ${adminNotes ? `<p style="color: #666; margin: 15px 0;"><strong>Update:</strong> ${adminNotes}</p>` : ""}
              
              <p style="color: #666; margin: 15px 0;">We appreciate your patience as we work towards a resolution.</p>
              
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
              
              <p style="color: #999; font-size: 12px; margin-top: 20px;">If you have any questions, please reference your ticket ID when contacting us.</p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Error sending status update email:", emailError);
    }

    res.json({
      message: "Grievance status updated successfully",
      grievance,
    });
  } catch (error) {
    console.error("Error updating grievance status:", error);
    res.status(500).json({ message: "Failed to update grievance status" });
  }
});

// DELETE /api/grievances/:grievanceId - Delete grievance (admin)
router.delete("/:grievanceId", async (req, res) => {
  try {
    const grievance = await Grievance.findByIdAndDelete(req.params.grievanceId);

    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    // Delete the evidence file if it exists
    if (grievance.evidenceFile && fs.existsSync(grievance.evidenceFile)) {
      fs.unlinkSync(grievance.evidenceFile);
    }

    res.json({ message: "Grievance deleted successfully" });
  } catch (error) {
    console.error("Error deleting grievance:", error);
    res.status(500).json({ message: "Failed to delete grievance" });
  }
});

export default router;
