import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface Article {
  _id: string;
  id: string;
  title: string;
  description: string | null;
  slug: string;
  content: string | null;
  pdf_url: string | null;
  image_url: string | null;
  url: string | null;
  is_published: boolean;
  position: number;
  sections: Array<{
    question: string;
    answer: string;
  }>;
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      if (!slug) throw new Error("Slug is required");
      const response = await fetch(`/api/articles/slug/${slug}`);
      if (!response.ok) throw new Error("Failed to fetch article");
      const article: Article = await response.json();
      return article;
    },
    enabled: !!slug,
  });

  const toggleSection = (index: number) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(index)) {
      newOpenSections.delete(index);
    } else {
      newOpenSections.add(index);
    }
    setOpenSections(newOpenSections);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Article Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/support">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Support
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <Link
            to="/support"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Support
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {article.title}
          </h1>

          {article.description && (
            <p className="text-lg text-muted-foreground max-w-2xl">
              {article.description}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Article Content */}
          {article.content && (
            <section className="prose prose-gray max-w-none">
              <div className="bg-card border border-border rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Article Content
                </h2>
                <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {article.content}
                </div>
              </div>
            </section>
          )}

          {/* Q&A Sections */}
          {article.sections && article.sections.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                More in this section
              </h2>
              <div className="space-y-4">
                {article.sections.map((section, index) => (
                  <Collapsible
                    key={index}
                    open={openSections.has(index)}
                    onOpenChange={() => toggleSection(index)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between p-6 h-auto text-left hover:bg-muted/50"
                      >
                        <span className="font-medium text-foreground">
                          {section.question}
                        </span>
                        {openSections.has(index) ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-6 pb-4">
                      <div className="pt-4 border-t border-border">
                        <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {section.answer}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {!article.content &&
            (!article.sections || article.sections.length === 0) && (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <ArrowLeft className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No content available
                </h3>
                <p className="text-muted-foreground">
                  This article doesn't have any content or Q&A sections yet.
                </p>
              </div>
            )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container max-w-4xl mx-auto px-4 py-8 text-center">
          <Link to="/support">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Support
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
