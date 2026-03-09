import mongoose from "mongoose";

const grievanceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
    },
    contact: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{10}$/, 'Please enter a valid 10-digit contact number'],
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    platform: {
      type: String,
      required: true,
      enum: ["Wander With Food App", "Wander With Food Website", "Other"],
    },
    issueCategory: {
      type: String,
      required: true,
      enum: [
        "Data Privacy Violation",
        "Payment Issues",
        "Harassment or Misconduct",
        "Platform Abuse",
        "Legal or Compliance Issue",
        "Other",
      ],
    },
    elaboration: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    incidentDate: {
      type: Date,
      default: null,
    },
    evidenceFile: {
      type: String, // File path/URL
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "in_review", "resolved", "closed"],
      default: "pending",
    },
    adminNotes: {
      type: String,
      default: "",
    },
    ticketId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Index for efficient querying
grievanceSchema.index({ status: 1, createdAt: -1 });
grievanceSchema.index({ email: 1 });
grievanceSchema.index({ contact: 1 });

export default mongoose.model("Grievance", grievanceSchema);
