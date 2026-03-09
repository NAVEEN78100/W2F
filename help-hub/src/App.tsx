import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ArticleDetail from "./pages/ArticleDetail";
import AllArticles from "./pages/AllArticles";
import TopicDetail from "./pages/TopicDetail";
import HelpItemDetail from "./pages/HelpItemDetail";
import FeedbackForm from "./pages/FeedbackForm";
import GeneralFeedbackForm from "./pages/GeneralFeedbackForm";
import GrievanceForm from "./pages/GrievanceForm";
import BugBountyForm from "./pages/BugBountyForms/BugBountyForm";
import NotFound from "./pages/NotFound";
import FeedbackButton from "./components/support/FeedbackButton";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Something went wrong
            </h1>
            <p className="text-muted-foreground mb-4">
              {this.state.error?.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/article/:slug" element={<ArticleDetail />} />
            <Route path="/all-articles" element={<AllArticles />} />
            <Route path="/topic/:slug" element={<TopicDetail />} />
            <Route
              path="/topic/:topicId/:questionSlug/:itemIndex"
              element={<HelpItemDetail />}
            />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/general-feedback" element={<GeneralFeedbackForm />} />
            <Route path="/grievance" element={<GrievanceForm />} />
            <Route path="/bug-bounty" element={<BugBountyForm />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FeedbackButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
