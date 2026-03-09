import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SupportHeader from "@/components/support/SupportHeader";
import SupportFooter from "@/components/support/SupportFooter";
import { ArrowLeft, Info, ChevronRight } from "lucide-react";
import { api, Article, Topic } from "@/lib/api";
import { topicFeedbackApiUrl } from "@/lib/api-config";

/* ---------------- ARTICLE DATA ---------------- */

const articlesData: Record<string, { title: string; content: string[] }> = {
  "what-is-wander-with-food": {
    title: "What is Wander With Food and how does it work?",
    content: [
      "Wander With Food is a food discovery and restaurant offers platform.",
      "You can explore nearby restaurants, redeem coupons and earn rewards.",
      "Browse through various cuisines and find exclusive deals.",
    ],
  },
  "how-to-redeem-coupon-codes": {
    title: "How to find and redeem coupon codes at restaurants",
    content: [
      "Browse offers, reveal coupon codes and show them at the restaurant.",
      "Offers may vary based on restaurant participation and availability.",
      "Make sure to check the validity dates and terms of each offer.",
    ],
  },
  "earning-rewards-reviews": {
    title: "Earning rewards by writing food reviews",
    content: [
      "Earn points by writing reviews and adding photos.",
      "Higher quality reviews with photos earn more rewards.",
      "Rewards can be redeemed for discounts on future orders.",
    ],
  },
  "setting-up-profile": {
    title: "How to create and manage your restaurant profile",
    content: [
      "Update your profile and manage preferences easily.",
      "Add your favorite cuisines and dietary restrictions.",
      "Customize notifications for offers in your area.",
    ],
  },
  "reward-eligibility": {
    title: "Understanding the loyalty points system",
    content: [
      "Learn how reward points work and how to redeem them.",
      "Points are earned through reviews, referrals, and purchases.",
      "Check your points balance in the app dashboard.",
    ],
  },
  "password-login-issues": {
    title: "Troubleshooting common app issues",
    content: [
      "Fix login, password and account access issues.",
      "Clear app cache and restart if experiencing glitches.",
      "Contact support if issues persist after troubleshooting.",
    ],
  },
  "update-payment-info": {
    title: "How to update your payment information",
    content: [
      "Keep your payment methods up to date for seamless transactions.",
      "Add or remove credit cards securely in your account settings.",
      "Enable biometric authentication for faster checkouts.",
    ],
  },
  "account-preferences": {
    title: "Managing your account preferences",
    content: [
      "Customize your app experience with personalized settings.",
      "Set notification preferences for offers and updates.",
      "Manage privacy settings and data sharing options.",
    ],
  },
  "how-to-sign-up": {
    title: "How to sign up and create your account",
    content: [
      "Signing up is quick and easy. Download the app and create your account.",
      "Provide your email and set a secure password.",
      "Verify your account to start exploring restaurants and offers.",
    ],
  },
  "exploring-restaurants-offers": {
    title: "Exploring nearby restaurants and offers",
    content: [
      "Use the app to discover restaurants near you.",
      "Browse through exclusive offers and coupons.",
      "Filter by cuisine, location, and ratings.",
    ],
  },
  "how-coupons-work": {
    title: "How coupon codes work on Wander With Food",
    content: [
      "Coupon codes provide discounts at participating restaurants.",
      "Each code has specific terms and expiration dates.",
      "Redeem codes directly in the app or at the restaurant.",
    ],
  },
  "redeeming-offers-guide": {
    title: "Step-by-step guide to redeeming offers",
    content: [
      "Select an offer in the app and generate the coupon code.",
      "Show the code to the restaurant staff when ordering.",
      "The discount will be applied to your bill.",
    ],
  },
  "coupon-not-working": {
    title: "Why a coupon may not work",
    content: [
      "Check if the coupon has expired or reached usage limits.",
      "Ensure you're at a participating restaurant.",
      "Contact support if the issue persists.",
    ],
  },
  "posting-reviews": {
    title: "How to post reviews and earn points",
    content: [
      "Write reviews after dining at restaurants.",
      "Include photos and detailed feedback for more points.",
      "Earn rewards that can be redeemed for discounts.",
    ],
  },
  "missing-rewards": {
    title: "Missing rewards troubleshooting",
    content: [
      "Check your rewards balance in the app dashboard.",
      "Ensure reviews meet the minimum requirements.",
      "Contact support if rewards don't appear after 24 hours.",
    ],
  },
  "updating-profile": {
    title: "Updating your profile details",
    content: [
      "Go to your profile settings to update information.",
      "Change your name, email, and preferences.",
      "Add a profile picture for a personalized experience.",
    ],
  },
  "account-deactivation": {
    title: "Account deactivation requests",
    content: [
      "Contact support to request account deactivation.",
      "Your data will be permanently deleted after confirmation.",
      "Active rewards may be forfeited upon deactivation.",
    ],
  },
  "location-nearby-restaurants": {
    title: "How location shows nearby restaurants",
    content: [
      "Enable location services for accurate restaurant discovery.",
      "The app uses GPS to find restaurants in your area.",
      "Adjust search radius in settings for more options.",
    ],
  },
  "incorrect-location": {
    title: "Troubleshooting incorrect location",
    content: [
      "Check if location permissions are enabled.",
      "Refresh the app or restart your device.",
      "Update your device's location settings.",
    ],
  },
  "location-settings": {
    title: "Adjusting search radius settings",
    content: [
      "Go to settings to change search radius.",
      "Increase radius to find more restaurants.",
      "Decrease radius for more local options.",
    ],
  },
  "restaurant-listing": {
    title: "How restaurants can list offers",
    content: [
      "Restaurants can partner with us to list exclusive offers.",
      "Contact our partnership team for more information.",
      "Offers help attract more customers and increase sales.",
    ],
  },
  "managing-coupons": {
    title: "Managing coupons and campaigns",
    content: [
      "Restaurants can create and manage coupon campaigns.",
      "Set expiration dates and usage limits.",
      "Track coupon performance through the dashboard.",
    ],
  },
  "visibility-approval": {
    title: "Visibility and approval timelines",
    content: [
      "Offers are reviewed before going live.",
      "Approval typically takes 24-48 hours.",
      "Ensure all information is accurate for faster approval.",
    ],
  },
  "data-usage": {
    title: "How we use and protect your data",
    content: [
      "We collect data to improve your experience.",
      "Your information is encrypted and securely stored.",
      "We never share personal data without consent.",
    ],
  },
  "privacy-policy": {
    title: "Our privacy policy explained",
    content: [
      "Read our full privacy policy for detailed information.",
      "We comply with data protection regulations.",
      "Contact us with any privacy concerns.",
    ],
  },
  "reporting-abuse": {
    title: "Reporting abuse or incorrect listings",
    content: [
      "Report inappropriate content through the app.",
      "Flag incorrect restaurant information.",
      "Our team reviews reports and takes appropriate action.",
    ],
  },
};

/* ---------------- SECTIONS (META STYLE) ---------------- */

/* ---------------- BROWSE TOPICS SLUGS ---------------- */

const browseTopicSlugs = [
  "how-to-sign-up",
  "exploring-restaurants-offers",
  "how-coupons-work",
  "redeeming-offers-guide",
  "coupon-not-working",
  "posting-reviews",
  "missing-rewards",
  "updating-profile",
  "account-deactivation",
  "location-nearby-restaurants",
  "incorrect-location",
  "location-settings",
  "restaurant-listing",
  "managing-coupons",
  "visibility-approval",
  "data-usage",
  "privacy-policy",
  "reporting-abuse",
];

/* ---------------- COMPONENT ---------------- */

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<
    Topic["quickQuestions"][0] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [addToLeft, setAddToLeft] = useState(true);
  const [leftSections, setLeftSections] = useState<string[]>([]);
  const [rightSections, setRightSections] = useState<string[]>([]);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = async (helpful: string) => {
    console.log("handleFeedbackSubmit called with:", helpful);
    try {
      const isBrowseTopic = browseTopicSlugs.includes(slug!);
      const endpoint = isBrowseTopic ? "topic-feedback" : "article-feedback";
      const payload = isBrowseTopic
        ? { topicSlug: slug, helpful }
        : { articleSlug: slug, helpful };

      const response = await fetch(topicFeedbackApiUrl(`/api/${endpoint}`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      console.log("Feedback submitted successfully");
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;

      try {
        const data = await api.getArticleBySlug(slug);
        setArticle(data);
      } catch (err) {
        console.error("Error fetching article from API:", err);
        // Fallback to static data if API fails
        const staticArticle = articlesData[slug];
        if (staticArticle) {
          setArticle({
            _id: slug,
            title: staticArticle.title,
            description: staticArticle.content.join(" "),
            slug,
            content: staticArticle.content.join("\n"),
            is_published: true,
            position: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        } else {
          // Try to find the question in topics
          try {
            const topics = await api.getPublishedTopics();
            let foundQuestion = null;
            let foundTopic = null;
            for (const topic of topics) {
              const question = topic.quickQuestions.find((q) => {
                const qSlug =
                  q.slug ||
                  q.question
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "");
                return qSlug === slug;
              });
              if (question) {
                foundQuestion = question;
                foundTopic = topic;
                break;
              }
            }
            if (foundQuestion) {
              const qSlug =
                foundQuestion.slug ||
                foundQuestion.question
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "");
              setArticle({
                _id: slug,
                title: foundQuestion.question,
                description:
                  foundQuestion.pdfText || foundQuestion.answer || "",
                slug,
                content: foundQuestion.pdfText || foundQuestion.answer || "",
                is_published: true,
                position: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              });
              setTopic(foundTopic);
              setCurrentQuestion({ ...foundQuestion, slug: qSlug });
            } else {
              // Try to find the helpChosenForYou item by slug
              let foundItem = null;
              let foundItemTopic = null;
              let foundItemQuestion = null;
              for (const topic of topics) {
                for (const question of topic.quickQuestions) {
                  if (question.helpChosenForYou) {
                    for (const item of question.helpChosenForYou) {
                      const itemSlug = item.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-+|-+$/g, "");
                      if (itemSlug === slug) {
                        foundItem = item;
                        foundItemTopic = topic;
                        foundItemQuestion = question;
                        break;
                      }
                    }
                    if (foundItem) break;
                  }
                }
                if (foundItem) break;
              }
              if (foundItem) {
                const qSlug =
                  foundItemQuestion.slug ||
                  foundItemQuestion.question
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "");
                setArticle({
                  _id: slug,
                  title: foundItem.title,
                  description: foundItem.description || "",
                  slug,
                  content: foundItem.content || "",
                  is_published: true,
                  position: 0,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                });
                setTopic(foundItemTopic);
                setCurrentQuestion({ ...foundItemQuestion, slug: qSlug });
              } else {
                // Try to find the article that has the helpChosenForYou item with matching title slug
                try {
                  const allArticles = await api.getAllArticles();
                  let foundArticle = null;
                  for (const article of allArticles) {
                    if (article.helpChosenForYou) {
                      for (const item of article.helpChosenForYou) {
                        const itemSlug = item.title
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-+|-+$/g, "");
                        if (itemSlug === slug) {
                          foundArticle = article;
                          break;
                        }
                      }
                      if (foundArticle) break;
                    }
                  }
                  if (foundArticle) {
                    // Find the specific helpChosenForYou item
                    let foundItem = null;
                    for (const item of foundArticle.helpChosenForYou || []) {
                      const itemSlug = item.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-+|-+$/g, "");
                      if (itemSlug === slug) {
                        foundItem = item;
                        break;
                      }
                    }
                    if (foundItem) {
                      setArticle({
                        ...foundArticle,
                        title: foundItem.title,
                        description:
                          foundItem.description || foundArticle.description,
                        content: foundItem.content || foundArticle.content,
                      });
                      setTopic(null);
                      setCurrentQuestion(null);
                    } else {
                      setArticle(foundArticle);
                      setTopic(null);
                      setCurrentQuestion(null);
                    }
                  } else {
                    setError("Failed to load article");
                  }
                } catch (articleErr) {
                  console.error(
                    "Error fetching articles for helpChosenForYou:",
                    articleErr,
                  );
                  setError("Failed to load article");
                }
              }
            }
          } catch (topicErr) {
            console.error("Error fetching topics:", topicErr);
            setError("Failed to load article");
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <>
        <SupportHeader />
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
        <SupportFooter />
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <SupportHeader />
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold">Article not found</h1>
          <Link to="/" className="text-blue-600 mt-2">
            Back to Help Centre
          </Link>
        </div>
        <SupportFooter />
      </>
    );
  }

  return (
    <>
      <SupportHeader />

      <main className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-14">
        {/* ---------------- LEFT MAIN CONTENT ---------------- */}
        <section>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Link to="/" className="hover:underline">
              Help Centre
            </Link>
            <span>/</span>
            <span>{article.title}</span>
          </nav>

          <h1 className="text-4xl font-semibold mb-8">{article.title}</h1>

          {/* INFO BOX */}
          <div className="flex gap-4 bg-gray-100 border border-gray-300 p-4 rounded mb-8">
            <Info />
            <p className="text-sm text-gray-700">
              This article is available to users enrolled in the relevant
              program.
            </p>
          </div>

          {article.content.split("\n").map((p, i) => (
            <p key={i} className="mb-4 text-base text-gray-800">
              {p}
            </p>
          ))}

          {/* ---------------- FEEDBACK SECTION (for browse topics) ---------------- */}
          {browseTopicSlugs.includes(slug!) && (
            <>
              <hr className="my-12" />

              {!feedbackSubmitted ? (
                <>
                  {/* HELPFUL */}
                  <p className="font-medium mb-4 text-base">
                    Was this information helpful?
                  </p>
                  <div className="flex gap-8">
                    <label className="flex items-center gap-2 text-base">
                      <input
                        type="radio"
                        name="helpful"
                        value="Yes"
                        onChange={(e) => handleFeedbackSubmit(e.target.value)}
                      />{" "}
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-base">
                      <input
                        type="radio"
                        name="helpful"
                        value="No"
                        onChange={(e) => handleFeedbackSubmit(e.target.value)}
                      />{" "}
                      No
                    </label>
                  </div>
                </>
              ) : (
                <p className="font-medium text-base text-green-600">
                  Thank you for your feedback!
                </p>
              )}

              <hr className="my-14" />
            </>
          )}

          {/* ---------------- FEEDBACK SECTION (for popular articles) ---------------- */}
          {!browseTopicSlugs.includes(slug!) && (
            <>
              <hr className="my-12" />

              {!feedbackSubmitted ? (
                <>
                  {/* HELPFUL */}
                  <p className="font-medium mb-4 text-base">
                    Was this information helpful?
                  </p>
                  <div className="flex gap-8">
                    <label className="flex items-center gap-2 text-base">
                      <input
                        type="radio"
                        name="helpful"
                        value="Yes"
                        onChange={(e) => handleFeedbackSubmit(e.target.value)}
                      />{" "}
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-base">
                      <input
                        type="radio"
                        name="helpful"
                        value="No"
                        onChange={(e) => handleFeedbackSubmit(e.target.value)}
                      />{" "}
                      No
                    </label>
                  </div>
                </>
              ) : (
                <p className="font-medium text-base text-green-600">
                  Thank you for your feedback!
                </p>
              )}

              <hr className="my-14" />
            </>
          )}

          {/* ---------------- MORE IN THIS SECTION ---------------- */}
          {article.sections &&
            article.sections.length > 0 &&
            !browseTopicSlugs.includes(slug!) && (
              <>
                <h2 className="text-2xl font-semibold mb-10">
                  More in this section
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20">
                  <div className="border-t">
                    {article.sections
                      .slice(0, Math.ceil(article.sections.length / 2))
                      .map((section, index) => (
                        <div key={index} className="border-b">
                          <button
                            onClick={() =>
                              setOpenAccordion(
                                openAccordion === section.question
                                  ? null
                                  : section.question,
                              )
                            }
                            className="flex items-center justify-between py-8 w-full text-left"
                          >
                            <span className="text-[24px] font-medium">
                              {section.question}
                            </span>
                            <span className="text-[36px] font-light leading-none">
                              {openAccordion === section.question ? "−" : "+"}
                            </span>
                          </button>

                          {openAccordion === section.question && (
                            <div className="pb-6 pr-6 text-[18px] text-gray-700 leading-relaxed">
                              {section.answer}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>

                  <div className="border-t">
                    {article.sections
                      .slice(Math.ceil(article.sections.length / 2))
                      .map((section, index) => (
                        <div key={index} className="border-b">
                          <button
                            onClick={() =>
                              setOpenAccordion(
                                openAccordion === section.question
                                  ? null
                                  : section.question,
                              )
                            }
                            className="flex items-center justify-between py-8 w-full text-left"
                          >
                            <span className="text-[24px] font-medium">
                              {section.question}
                            </span>
                            <span className="text-[36px] font-light leading-none">
                              {openAccordion === section.question ? "−" : "+"}
                            </span>
                          </button>

                          {openAccordion === section.question && (
                            <div className="pb-6 pr-6 text-[18px] text-gray-700 leading-relaxed">
                              {section.answer}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}
        </section>

        {/* ---------------- RIGHT SIDEBAR ---------------- */}
        <aside className="sticky top-24 h-fit">
          <h3 className="font-semibold mb-5 text-base">Help chosen for you</h3>

          <ul className="space-y-5">
            {currentQuestion &&
            currentQuestion.helpChosenForYou &&
            currentQuestion.helpChosenForYou.length > 0 ? (
              currentQuestion.helpChosenForYou.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <Link
                    to={`/topic/${topic?.slug}/${currentQuestion?.slug}/${index}`}
                    className="flex justify-between items-center w-full hover:bg-gray-50 p-2 rounded transition-colors"
                  >
                    <div>
                      <p className="text-base">{item.title}</p>
                      <span className="text-gray-500 text-sm">
                        {item.description}
                      </span>
                    </div>
                    <ChevronRight />
                  </Link>
                </li>
              ))
            ) : article.helpChosenForYou &&
              article.helpChosenForYou.length > 0 ? (
              article.helpChosenForYou.map((item, index) => {
                const itemSlug = item.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "");
                return (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b pb-4"
                  >
                    <Link
                      to={`/article/${itemSlug}`}
                      className="flex justify-between items-center w-full hover:bg-gray-50 p-2 rounded transition-colors"
                    >
                      <div>
                        <p className="text-base">{item.title}</p>
                        <span className="text-gray-500 text-sm">
                          {item.description}
                        </span>
                      </div>
                      <ChevronRight />
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className="text-gray-500 text-sm">No help items available</li>
            )}
          </ul>
        </aside>
      </main>

      <SupportFooter />
    </>
  );
}
