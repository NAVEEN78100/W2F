import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, FileText, ChevronRight, Loader2, Plus, Edit, Trash2, Save, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  url: string | null;
  image_url: string | null;
  sections: Array<{
    question: string;
    answer: string;
  }>;
}

interface Topic {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  quickQuestions: Array<{
    id: string;
    question: string;
    pdfText?: string;
  }>;
  is_published: boolean;
}

const ICON_MAP: Record<string, string> = {
  book: "📚",
  settings: "⚙️",
  user: "👤",
  "credit-card": "💳",
  shield: "🛡️",
  rocket: "🚀",
  help: "❓",
  api: "🔌",
};

export default function Support() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedArticles, setExpandedArticles] = useState<Set<string>>(new Set());
  const [editingFaq, setEditingFaq] = useState<string | null>(null);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: articles = [], isLoading: loadingArticles } = useQuery({
    queryKey: ["support-articles"],
    queryFn: async () => {
      const response = await fetch("/api/articles/published");
      if (!response.ok) throw new Error("Failed to fetch articles");
      return response.json() as Promise<Article[]>;
    },
  });

  const { data: topics = [], isLoading: loadingTopics } = useQuery({
    queryKey: ["support-topics"],
    queryFn: async () => {
      const response = await fetch("/api/topics/published");
      if (!response.ok) throw new Error("Failed to fetch topics");
      return response.json() as Promise<Topic[]>;
    },
  });

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTopics = topics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isLoading = loadingArticles || loadingTopics;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <div className="container max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How can we help?
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Search our knowledge base or browse topics below to find the answers
            you need.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-card border-border shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-6xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-12">
            {/* Popular Articles */}
            {filteredArticles.length > 0 && (
              <section className="animate-fade-in">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Popular Articles
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredArticles.map((article) => (
                    <a
                      key={article.id}
                      href={article.url || "#"}
                      className="group flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        {article.image_url ? (
                          <img
                            src={article.image_url}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <FileText className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        {article.description && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {article.description}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Browse Topics */}
            {filteredTopics.length > 0 && (
              <section className="animate-fade-in">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Browse Topics
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredTopics.map((topic) => (
                    <div
                      key={topic._id}
                      className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all"
                    >
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-4">
                        {topic.icon} {topic.title}
                      </h3>
                      {topic.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {topic.description}
                        </p>
                      )}
                      {/* Quick Questions */}
                      <div className="space-y-2 mb-4">
                        {topic.quickQuestions?.slice(0, 3).map((q, index) => (
                          <Link
                            key={index}
                            to={q.pdfText ? `/support/topic/${topic._id}/question/${index}` : '#'}
                            className="w-full text-left p-2 rounded-md bg-muted/50 hover:bg-muted text-sm text-foreground hover:text-primary transition-colors block"
                          >
                            {q.question}
                          </Link>
                        ))}
                      </div>
                      {/* View More */}
                      <button
                        onClick={() => {
                          window.location.href = `/support/topic/${topic._id}`;
                        }}
                        className="w-full text-center text-sm text-primary hover:underline"
                      >
                        View More
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* More in this section - Q&A */}
            <section className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  Frequently Asked Questions
                </h2>
                <Button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add FAQ
                </Button>
              </div>

              {/* Add FAQ Form */}
              {showAddForm && (
                <div className="bg-card border border-border rounded-xl p-6 mb-6">
                  <h3 className="font-medium text-foreground mb-4">Add New FAQ</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Question
                      </label>
                      <Input
                        value={newFaq.question}
                        onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                        placeholder="Enter the question"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Answer
                      </label>
                      <Textarea
                        value={newFaq.answer}
                        onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                        placeholder="Enter the answer"
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => createFaqMutation.mutate(newFaq)}
                        disabled={createFaqMutation.isPending}
                      >
                        {createFaqMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowAddForm(false);
                          setNewFaq({ question: "", answer: "" });
                        }}
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {filteredArticles
                  .filter(article => article.sections && article.sections.length > 0)
                  .flatMap(article =>
                    article.sections.map((section, sectionIndex) => ({
                      ...section,
                      articleTitle: article.title,
                      articleSlug: article.slug,
                      sectionIndex,
                      id: `${article.id}-${sectionIndex}` // Create a unique ID for each FAQ
                    }))
                  )
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all"
                    >
                      {editingFaq === item.id ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Question
                            </label>
                            <Input
                              value={item.question}
                              onChange={(e) => {
                                // For now, we'll just display - full edit functionality would require backend changes
                              }}
                              placeholder="Enter the question"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Answer
                            </label>
                            <Textarea
                              value={item.answer}
                              onChange={(e) => {
                                // For now, we'll just display - full edit functionality would require backend changes
                              }}
                              placeholder="Enter the answer"
                              rows={4}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => setEditingFaq(null)}
                            >
                              <Save className="w-4 h-4" />
                              Save
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setEditingFaq(null)}
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-foreground mb-2">
                                {item.question}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                                {item.answer}
                              </p>
                              <Link
                                to={`/support/article/${item.articleSlug}`}
                                className="text-xs text-primary font-medium hover:underline"
                              >
                                Read full answer →
                              </Link>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingFaq(item.id)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  if (confirm("Are you sure you want to delete this FAQ?")) {
                                    deleteFaqMutation.mutate(item.id);
                                  }
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
              </div>
            </section>

            {/* Empty State */}
            {filteredArticles.length === 0 &&
              filteredTopics.length === 0 &&
              !isLoading && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {searchQuery ? "No results found" : "No content yet"}
                  </h3>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? "Try adjusting your search terms"
                      : "Check back soon for helpful articles and topics"}
                  </p>
                </div>
              )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container max-w-6xl mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>Can't find what you're looking for? Contact our support team.</p>
        </div>
      </footer>
    </div>
  );
}
