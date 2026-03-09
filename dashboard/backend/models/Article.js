import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    content: {
      type: String,
      trim: true,
    },
    pdf_url: {
      type: String,
      trim: true,
    },
    image_url: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Number,
      default: 0,
    },
    sections: [
      {
        question: {
          type: String,
          required: true,
          trim: true,
        },
        answer: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    helpChosenForYou: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
        link: {
          type: String,
          trim: true,
        },
        pdf_url: {
          type: String,
          trim: true,
        },
        content: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Article", articleSchema);
