import mongoose from 'mongoose';
import Article from './models/Article.js';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const sampleArticles = [
  {
    title: "Getting Started",
    description: "Learn the basics of using our platform",
    slug: "getting-started",
    content: "Welcome to our platform! Getting started is easy. To create an account, click on the 'Sign Up' button in the top right corner of the homepage. Fill in your email address, create a password, and verify your email. Once verified, you'll have access to all features.\n\nOur platform helps you discover amazing restaurants and culinary experiences around the world. Our platform combines AI-powered recommendations with user reviews to help you find the perfect dining experience.",
    is_published: true,
    position: 0,
    sections: [
      {
        question: "How do I create an account?",
        answer: "Click on the 'Sign Up' button in the top right corner of the homepage. Fill in your email address, create a password, and verify your email. Once verified, you'll have access to all features."
      },
      {
        question: "Is the platform free to use?",
        answer: "Yes! The platform is completely free to use. You can browse restaurants, read reviews, and get recommendations without paying anything. Optional premium features are available for enhanced experiences."
      }
    ]
  },
  {
    title: "Dashboard Overview",
    description: "Learn about the dashboard and how to use it",
    slug: "dashboard-overview",
    content: "The dashboard provides an overview of your account activity, recent articles, and quick access to important features. You can customize it to show the information most relevant to you.\n\nKey features include:\n- Recent activity feed\n- Quick access to favorite restaurants\n- Personalized recommendations\n- Account settings\n\nUse the dashboard to navigate efficiently and make the most of our platform.",
    is_published: true,
    position: 1,
    sections: [
      {
        question: "What is the dashboard for?",
        answer: "The dashboard provides an overview of your account activity, recent articles, and quick access to important features. You can customize it to show the information most relevant to you."
      },
      {
        question: "Can I customize the dashboard?",
        answer: "Yes, you can customize the dashboard to show the information most relevant to you. Use the settings to arrange widgets and preferences."
      }
    ]
  },
  {
    title: "Password Reset",
    description: "How to reset your password if forgotten",
    slug: "password-reset",
    content: "If you've forgotten your password, click on 'Forgot Password' on the login page. Enter your email address and we'll send you a reset link. Follow the instructions in the email to create a new password.\n\nFor security reasons, reset links expire after 24 hours. If you don't receive the email, check your spam folder or try again.\n\nTips:\n- Use a strong, unique password\n- Enable two-factor authentication for extra security\n- Never share your password with others",
    is_published: true,
    position: 2,
    sections: [
      {
        question: "How do I reset my password?",
        answer: "Click on 'Forgot Password' on the login page. Enter your email address and we'll send you a reset link. Follow the instructions in the email to create a new password."
      },
      {
        question: "What if I don't receive the reset email?",
        answer: "Check your spam folder or try again. If you still don't receive it, contact support for assistance."
      }
    ]
  },
  {
    title: "Profile Update",
    description: "How to update your profile information",
    slug: "profile-update",
    content: "Go to Settings > Profile to update your personal information, including your name, bio, and profile picture. Changes are saved automatically.\n\nYou can update:\n- Personal details (name, email, phone)\n- Profile picture\n- Bio and preferences\n- Privacy settings\n\nKeep your profile up to date to get better recommendations and connect with other food lovers.",
    is_published: true,
    position: 3,
    sections: [
      {
        question: "How do I update my profile information?",
        answer: "Go to Settings > Profile to update your personal information, including your name, bio, and profile picture. Changes are saved automatically."
      },
      {
        question: "What information can I update?",
        answer: "You can update your name, bio, profile picture, email, phone, and privacy settings."
      }
    ]
  },
  {
    title: "Email Change",
    description: "How to change your email address",
    slug: "email-change",
    content: "Yes, you can change your email address in Settings > Account. You'll need to verify the new email address before the change takes effect.\n\nSteps:\n1. Go to Settings > Account\n2. Click 'Change Email'\n3. Enter your new email address\n4. Verify the new email\n5. Confirm the change\n\nYour old email will remain active until you confirm the new one.",
    is_published: true,
    position: 4,
    sections: [
      {
        question: "Can I change my email address?",
        answer: "Yes, you can change your email address in Settings > Account. You'll need to verify the new email address before the change takes effect."
      },
      {
        question: "What happens to my old email?",
        answer: "Your old email will remain active until you confirm the new one. You'll receive notifications at both addresses during the transition."
      }
    ]
  }
];

const populateArticles = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Delete existing articles
    await Article.deleteMany({});
    console.log('Cleared existing articles');

    // Insert sample articles
    const result = await Article.insertMany(sampleArticles);
    console.log(`✓ ${result.length} articles created successfully`);

    result.forEach((article) => {
      console.log(`  - ${article.title}`);
    });
  } catch (error) {
    console.error('Error populating articles:', error);
  } finally {
    mongoose.connection.close();
  }
};

populateArticles();
