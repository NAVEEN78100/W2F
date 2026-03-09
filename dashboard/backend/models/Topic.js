import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
    },
    quickQuestions: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
        },
        slug: {
          type: String,
        },
        pdfText: {
          type: String,
        },
        helpChosenForYou: [
          {
            title: {
              type: String,
              required: true,
            },
            description: {
              type: String,
            },
            link: {
              type: String,
            },
            content: {
              type: String,
            },
            pdf_url: {
              type: String,
            },
          },
        ],
      },
    ],
    additionalQA: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
        },
      },
    ],
    is_published: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Generate slug from name before saving
topicSchema.pre("save", function (next) {
  try {
    // Generate slug from name if not provided
    if (!this.slug && this.name) {
      this.slug = this.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
    }
    // If title is not set, use name
    if (!this.title && this.name) {
      this.title = this.name;
    }
    next();
  } catch (error) {
    console.error("Error in pre-save hook:", error);
    next(error);
  }
});

export default mongoose.model("Topic", topicSchema);
