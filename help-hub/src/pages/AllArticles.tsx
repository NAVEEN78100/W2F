import { useState } from "react";
import { Link } from "react-router-dom";
import SupportHeader from "@/components/support/SupportHeader";
import SupportFooter from "@/components/support/SupportFooter";
import { Search } from "lucide-react";

const allArticles = [
  {
    slug: "what-is-wander-with-food",
    title: "What is Wander With Food and how does it work?",
    topic: "popular-articles",
    content: [
      "Wander With Food is a food discovery and restaurant offers platform.",
      "You can explore nearby restaurants, redeem coupons and earn rewards.",
      "Browse through various cuisines and find exclusive deals.",
    ],
  },
  {
    slug: "how-to-redeem-coupon-codes",
    title: "How to find and redeem coupon codes at restaurants",
    topic: "popular-articles",
    content: [
      "Browse offers, reveal coupon codes and show them at the restaurant.",
      "Offers may vary based on restaurant participation and availability.",
      "Make sure to check the validity dates and terms of each offer.",
    ],
  },
  {
    slug: "earning-rewards-reviews",
    title: "Earning rewards by writing food reviews",
    topic: "popular-articles",
    content: [
      "Earn points by writing reviews and adding photos.",
      "Higher quality reviews with photos earn more rewards.",
      "Rewards can be redeemed for discounts on future orders.",
    ],
  },
  {
    slug: "setting-up-profile",
    title: "How to create and manage your restaurant profile",
    topic: "getting-started",
    content: [
      "Update your profile and manage preferences easily.",
      "Add your favorite cuisines and dietary restrictions.",
      "Customize notifications for offers in your area.",
    ],
  },
  {
    slug: "reward-eligibility",
    title: "Understanding the loyalty points system",
    topic: "reviews-rewards",
    content: [
      "Learn how reward points work and how to redeem them.",
      "Points are earned through reviews, referrals, and purchases.",
      "Check your points balance in the app dashboard.",
    ],
  },
  {
    slug: "password-login-issues",
    title: "Troubleshooting common app issues",
    topic: "account-profile",
    content: [
      "Fix login, password and account access issues.",
      "Clear app cache and restart if experiencing glitches.",
      "Contact support if issues persist after troubleshooting.",
    ],
  },
  {
    slug: "update-payment-info",
    title: "How to update your payment information",
    topic: "account-profile",
    content: [
      "Keep your payment methods up to date for seamless transactions.",
      "Add or remove credit cards securely in your account settings.",
      "Enable biometric authentication for faster checkouts.",
    ],
  },
  {
    slug: "account-preferences",
    title: "Managing your account preferences",
    topic: "account-profile",
    content: [
      "Customize your app experience with personalized settings.",
      "Set notification preferences for offers and updates.",
      "Manage privacy settings and data sharing options.",
    ],
  },
];

const AllArticles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  const filteredArticles = allArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = filteredArticles.length > visibleCount;

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <>
      <SupportHeader />

      <main className="max-w-[1320px] mx-auto px-6 py-12">
        {/* Articles Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-normal text-[#1C1E21] mb-8">
            Popular articles
          </h2>

          <div className="space-y-8">
            {allArticles.map((article) => (
              <div key={article.slug} className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-[#1C1E21] mb-4">
                  {article.title}
                </h3>
                <div className="space-y-2">
                  {article.content.map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <SupportFooter />
    </>
  );
};

export default AllArticles;
