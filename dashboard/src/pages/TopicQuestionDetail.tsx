import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { apiUrl } from "@/lib/api-config";

interface QuickQuestion {
  id: string;
  question: string;
  pdfText?: string;
}

interface Topic {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  quickQuestions: QuickQuestion[];
  is_published: boolean;
}

export default function TopicQuestionDetail() {
  const { id, questionIndex } = useParams<{
    id: string;
    questionIndex: string;
  }>();
  const navigate = useNavigate();
  const qIndex = parseInt(questionIndex || "0");

  const {
    data: topic,
    isLoading,
    error,
  } = useQuery<Topic>({
    queryKey: ["topic", id],
    queryFn: async () => {
      const res = await fetch(apiUrl(`/api/topics/${id}`));
      if (!res.ok) throw new Error("Failed to fetch topic");
      return res.json();
    },
  });

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!topic) {
    return <div className="p-8">Topic not found</div>;
  }

  const question = topic.quickQuestions?.[qIndex];

  if (!question) {
    return <div className="p-8">Question not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate(`/support/topic/${id}`)}
            className="mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Topic
          </Button>
          <h1 className="text-3xl font-bold text-slate-900">
            {topic.icon} {topic.title}
          </h1>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-slate-900">
              {question.question}
            </h2>
          </CardHeader>
          <CardContent>
            {question.pdfText ? (
              <div className="prose prose-sm max-w-none">
                <p className="text-slate-700 whitespace-pre-wrap">
                  {question.pdfText}
                </p>
              </div>
            ) : (
              <p className="text-slate-600 italic">
                No detailed answer available yet.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (qIndex > 0) {
                navigate(`/support/topic/${id}/question/${qIndex - 1}`);
              }
            }}
            disabled={qIndex === 0}
          >
            Previous Question
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/support/topic/${id}`)}
          >
            View All Questions
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              if (qIndex < topic.quickQuestions.length - 1) {
                navigate(`/support/topic/${id}/question/${qIndex + 1}`);
              }
            }}
            disabled={qIndex === topic.quickQuestions.length - 1}
          >
            Next Question
          </Button>
        </div>
      </div>
    </div>
  );
}
