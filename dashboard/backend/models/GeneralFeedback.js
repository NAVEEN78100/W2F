import mongoose from "mongoose";

const generalFeedbackSchema = new mongoose.Schema(
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
      enum: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh", "Andaman and Nicobar Islands", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep"],
    },
    city: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    section: {
      type: String,
      required: true,
      enum: ["Support", "Content", "Technical", "General"],
      default: "General",
    },
    feedbackType: {
      type: String,
      required: true,
      enum: ["Feature suggestion", "UX improvement", "Category suggestion", "General feedback"],
    },
    feedbackDetails: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
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
    referralCode: {
      type: String,
      default: null,
    },
    referralCodeUsed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Index for efficient querying
generalFeedbackSchema.index({ status: 1, createdAt: -1 });
generalFeedbackSchema.index({ email: 1 });
generalFeedbackSchema.index({ contact: 1 });

export default mongoose.model("GeneralFeedback", generalFeedbackSchema);
