import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SupportHeader from "@/components/support/SupportHeader";
import SupportFooter from "@/components/support/SupportFooter";
import { ArrowLeft, Info } from "lucide-react";
import { api, Topic } from "@/lib/api";
import { topicFeedbackApiUrl } from "@/lib/api-config";

export default function HelpItemDetail() {
  const { topicId, questionSlug, itemIndex } = useParams<{
    topicId: string;
    questionSlug: string;
    itemIndex: string;
  }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [helpItem, setHelpItem] = useState<{
    title: string;
    description?: string;
    content?: string;
    pdf_url?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleFeedbackSubmit = async (helpful: string) => {
    try {
      const response = await fetch(topicFeedbackApiUrl("/api/topic-feedback"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topicSlug: `${topicId}/${questionSlug}/${itemIndex}`,
          helpful,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      // Optional: Show success message or update UI
      console.log("Feedback submitted successfully");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  useEffect(() => {
    const fetchHelpItem = async () => {
      if (!topicId || !questionSlug || !itemIndex) return;

      try {
        const topicData = await api.getTopicBySlug(topicId);
        setTopic(topicData);

        // Find the question by slug
        const foundQuestion = topicData.quickQuestions.find((q) => {
          const qSlug =
            q.slug ||
            q.question
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "");
          return qSlug === questionSlug;
        });

        if (!foundQuestion) {
          setError("Question not found");
          return;
        }

        if (foundQuestion.helpChosenForYou) {
          const itemIdx = parseInt(itemIndex);
          const item = foundQuestion.helpChosenForYou[itemIdx];
          if (item) {
            setHelpItem(item);
          } else {
            setError("Help item not found");
          }
        } else {
          setError("No help items available");
        }
      } catch (err) {
        console.error("Error fetching help item:", err);
        setError("Failed to load help item");
      } finally {
        setLoading(false);
      }
    };

    fetchHelpItem();
  }, [topicId, questionSlug, itemIndex]);

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

  if (error || !helpItem) {
    return (
      <>
        <SupportHeader />
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold">Help item not found</h1>
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

      <main className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:underline">
            Help Centre
          </Link>
          <span>/</span>
          {topic && (
            <>
              <Link to={`/topic/${topic.slug}`} className="hover:underline">
                {topic.title}
              </Link>
              <span>/</span>
            </>
          )}
          <span>{helpItem.title}</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-8">{helpItem.title}</h1>

        {/* INFO BOX */}
        <div className="flex gap-4 bg-gray-100 border border-gray-300 p-4 rounded mb-8">
          <Info />
          <p className="text-sm text-gray-700">
            This help item contains detailed information to assist you.
          </p>
        </div>

        {/* Description */}
        {helpItem.description && (
          <div className="mb-6">
            <p className="text-base text-gray-800">{helpItem.description}</p>
          </div>
        )}

        {/* PDF Content */}
        {helpItem.content && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Content</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="prose prose-gray max-w-none">
                {helpItem.content.split("\n").map((paragraph, i) => (
                  <p key={i} className="mb-4 text-gray-800 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PDF URL indicator */}
        {helpItem.pdf_url && (
          <div className="mb-8">
            <p className="text-sm text-blue-600">
              📄 This content was extracted from a PDF document
            </p>
          </div>
        )}

        <hr className="my-12" />

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

        <hr className="my-14" />

        {/* Back button */}
        <div className="flex justify-start">
          <Link
            to={topic ? `/topic/${topic.slug}` : "/"}
            className="inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {topic ? topic.title : "Help Centre"}
          </Link>
        </div>
      </main>

      <SupportFooter />
    </>
  );
}
