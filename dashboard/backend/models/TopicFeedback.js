import mongoose from "mongoose";

const topicFeedbackSchema = new mongoose.Schema({
  topicSlug: {
    type: String,
    required: true,
  },
  helpful: {
    type: String,
    required: true,
    enum: ["Yes", "No"],
  },
  userAgent: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const TopicFeedback = mongoose.model("TopicFeedback", topicFeedbackSchema);

export default TopicFeedback;
