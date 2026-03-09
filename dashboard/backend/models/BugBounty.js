import mongoose from "mongoose";

const bugBountySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
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
    },
    operatingSystem: {
      type: String,
      required: true,
      enum: ["iOS", "Android", "Windows", "Other"],
    },
    bugDescription: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    referenceFile: {
      type: String,
      required: false,
    },
    ticketId: {
      type: String,
      required: true,
      unique: true,
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
  },
  {
    timestamps: true,
  },
);

// Indexes for better query performance
bugBountySchema.index({ email: 1 });
bugBountySchema.index({ contact: 1 });
bugBountySchema.index({ status: 1 });
bugBountySchema.index({ createdAt: -1 });

const BugBounty = mongoose.model("BugBounty", bugBountySchema);

export default BugBounty;
