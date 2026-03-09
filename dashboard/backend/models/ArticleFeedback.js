import mongoose from "mongoose";

const articleFeedbackSchema = new mongoose.Schema(
  {
    articleSlug: {
      type: String,
      required: true,
      trim: true,
    },
    helpful: {
      type: String,
      required: true,
      enum: ["Yes", "No"],
    },
    userAgent: {
      type: String,
      default: "",
    },
    ipAddress: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// Index for efficient querying
articleFeedbackSchema.index({ articleSlug: 1, createdAt: -1 });

export default mongoose.model("ArticleFeedback", articleFeedbackSchema);
