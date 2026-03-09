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

export default function TopicDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: topic, isLoading } = useQuery<Topic>({
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/support")}
            className="mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Support
          </Button>
          <h1 className="text-3xl font-bold text-slate-900">
            {topic.icon} {topic.title}
          </h1>
          <p className="mt-2 text-slate-600">{topic.description}</p>
        </div>
      </div>

      {/* Questions List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">
          All Questions
        </h2>

        <div className="space-y-4">
          {topic.quickQuestions && topic.quickQuestions.length > 0 ? (
            topic.quickQuestions.map((question, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() =>
                  navigate(`/support/topic/${id}/question/${index}`)
                }
              >
                <CardContent className="pt-6">
                  <p className="text-lg font-medium text-slate-900">
                    {question.question}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">
                No quick questions available for this topic yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
