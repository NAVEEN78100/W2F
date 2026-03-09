import mongoose from "mongoose";
import Topic from "./models/Topic.js";
import dotenv from "dotenv";

dotenv.config();

const seedTopics = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/content-hub"
    );

    // Clear existing topics
    await Topic.deleteMany({});

    const topics = [
      {
        name: "Getting Started",
        description: "Learn the basics of using our platform",
        slug: "getting-started",
        icon: "Rocket",
        is_published: true,
        quickQuestions: [
          {
            question: "How to sign up and create your account",
            answer:
              "Signing up is quick and easy. Download the app and create your account. Provide your email and set a secure password. Verify your account to start exploring restaurants and offers.",
            slug: "how-to-sign-up",
            pdfText:
              "Signing up is quick and easy. Download the app and create your account. Provide your email and set a secure password. Verify your account to start exploring restaurants and offers.",
          },
          {
            question: "Exploring nearby restaurants and offers",
            answer:
              "Use the app to discover restaurants near you. Browse through exclusive offers and coupons. Filter by cuisine, location, and ratings.",
            slug: "exploring-restaurants-offers",
            pdfText:
              "Use the app to discover restaurants near you. Browse through exclusive offers and coupons. Filter by cuisine, location, and ratings.",
          },
          {
            question: "How coupon codes work on Wander With Food",
            answer:
              "Coupon codes provide discounts at participating restaurants. Each code has specific terms and expiration dates. Redeem codes directly in the app or at the restaurant.",
            slug: "how-coupons-work",
            pdfText:
              "Coupon codes provide discounts at participating restaurants. Each code has specific terms and expiration dates. Redeem codes directly in the app or at the restaurant.",
          },
        ],
        additionalQA: [],
        position: 0,
      },
      {
        name: "Account Management",
        description: "Manage your account settings and preferences",
        slug: "account-management",
        icon: "User",
        is_published: true,
        quickQuestions: [
          {
            question: "How do I update my profile information?",
            answer:
              "Go to Settings > Profile to update your personal information, including your name, bio, and profile picture. Changes are saved automatically.",
            slug: "how-do-i-update-my-profile-information",
            pdfText:
              "Go to Settings > Profile to update your personal information, including your name, bio, and profile picture. Changes are saved automatically.",
          },
          {
            question: "Can I change my email address?",
            answer:
              "Yes, you can change your email address in Settings > Account. You'll need to verify the new email address before the change takes effect.",
            slug: "can-i-change-my-email-address",
            pdfText:
              "Yes, you can change your email address in Settings > Account. You'll need to verify the new email address before the change takes effect.",
          },
          {
            question: "How do I delete my account?",
            answer:
              "To delete your account, go to Settings > Account > Delete Account. This action is permanent and cannot be undone.",
            slug: "how-do-i-delete-my-account",
            pdfText:
              "To delete your account, go to Settings > Account > Delete Account. This action is permanent and cannot be undone.",
          },
        ],
        additionalQA: [],
        position: 1,
      },
    ];

    await Topic.insertMany(topics);
    console.log("Topics seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding topics:", error);
    process.exit(1);
  }
};

seedTopics();
