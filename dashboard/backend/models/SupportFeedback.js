import mongoose from "mongoose";

const supportFeedbackSchema = new mongoose.Schema(
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
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
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
      enum: ["Android App", "iOS App", "Website"],
    },
    issueCategory: {
      type: String,
      required: true,
    },
    elaboration: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
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
    },
  },
  {
    timestamps: true,
  },
);

// Index for efficient querying
supportFeedbackSchema.index({ status: 1, createdAt: -1 });
supportFeedbackSchema.index({ email: 1 });
supportFeedbackSchema.index({ contact: 1 });

export default mongoose.model("SupportFeedback", supportFeedbackSchema);
