import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    helpItemId: {
      type: String,
      required: true,
    },
    topicId: {
      type: String,
      required: true,
    },
    questionSlug: {
      type: String,
      required: true,
    },
    itemIndex: {
      type: Number,
      required: true,
    },
    response: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },
    userId: {
      type: String,
      default: null, // Optional: for anonymous feedback
    },
  },
  {
    timestamps: true,
  },
);

// Compound index to prevent duplicate feedback from same user on same item
feedbackSchema.index(
  { helpItemId: 1, userId: 1 },
  { unique: true, sparse: true },
);

export default mongoose.model("Feedback", feedbackSchema);
