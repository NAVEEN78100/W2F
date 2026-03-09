import mongoose from "mongoose";

const referralCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    usedBy: {
      type: String, // email of the user who used it
      default: null,
    },
    usedAt: {
      type: Date,
      default: null,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from creation
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Index for efficient querying
referralCodeSchema.index({ expiresAt: 1 });
referralCodeSchema.index({ isUsed: 1 });

export default mongoose.model("ReferralCode", referralCodeSchema);
