import { useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SupportHeader from "@/components/support/SupportHeader";
import SupportFooter from "@/components/support/SupportFooter";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { api, Topic } from "@/lib/api";
import { topicFeedbackApiUrl } from "@/lib/api-config";

const TopicDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const isViewMore = searchParams.get("viewMore") === "true";
  const [searchTerm, setSearchTerm] = useState("");
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = async (helpful: string) => {
    console.log("handleFeedbackSubmit called with:", helpful);
    try {
      const response = await fetch(topicFeedbackApiUrl("/api/topic-feedback"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topicSlug: slug,
          helpful,
        }),
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
    const fetchTopic = async () => {
      if (!slug) return;

      try {
        const data = await api.getTopicBySlug(slug);
        setTopic(data);
      } catch (err) {
        setError("Failed to load topic");
        console.error("Error fetching topic:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
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

  if (error || !topic) {
    return (
      <>
        <SupportHeader />
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold">Topic not found</h1>
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

      <main className="max-w-[1320px] mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-normal text-[#1C1E21] mb-8">
            {topic.title}
          </h1>

          {!isViewMore && (
            <>
              {/* Search Input */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </>
          )}
        </div>

        {/* Questions Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-normal text-[#1C1E21] mb-8">
            {topic.title}
          </h2>

          <div className="space-y-8">
            {topic.quickQuestions.map((question, index) => (
              <div
                key={isViewMore ? index : question.slug}
                className="border-b border-gray-200 pb-6"
              >
                {!isViewMore && (
                  <Link to={`/article/${question.slug}`} className="block">
                    <h3 className="text-xl font-bold text-[#1C1E21] mb-4 hover:text-blue-600">
                      {question.question}
                    </h3>
                  </Link>
                )}
                {isViewMore && (
                  <h3 className="text-xl font-bold text-[#1C1E21] mb-4">
                    {question.question}
                  </h3>
                )}
                <div className="space-y-2">
                  <p className="text-gray-700 leading-relaxed">
                    {question.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Section - Only show when viewing more */}
        {isViewMore && (
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
      </main>

      <SupportFooter />
    </>
  );
};

export default TopicDetail;
