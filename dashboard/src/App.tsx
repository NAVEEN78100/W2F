import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Support from "./pages/Support";
import TopicDetail from "./pages/TopicDetail";
import TopicQuestionDetail from "./pages/TopicQuestionDetail";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ArticlesManager from "./pages/admin/ArticlesManager";
import TopicsManager from "./pages/admin/TopicsManager";
import SupportFeedbackManager from "./pages/admin/SupportFeedbackManager";
import GeneralFeedbackManager from "./pages/admin/GeneralFeedbackManager";
import ArticleFeedbackManager from "./pages/admin/ArticleFeedbackManager";
import TopicFeedbackManager from "./pages/admin/TopicFeedbackManager";
import ReferralCodeLogs from "./pages/admin/ReferralCodeLogs";
import GrievancesManager from "./pages/admin/GrievancesManager";
import BugBountyManager from "./pages/admin/BugBountyManager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/support" element={<Support />} />
            <Route path="/support/topic/:id" element={<TopicDetail />} />
            <Route
              path="/support/topic/:id/question/:questionIndex"
              element={<TopicQuestionDetail />}
            />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="articles" element={<ArticlesManager />} />
              <Route path="topics" element={<TopicsManager />} />
              <Route
                path="support-feedback"
                element={<SupportFeedbackManager />}
              />
              <Route
                path="general-feedback"
                element={<GeneralFeedbackManager />}
              />
              <Route
                path="article-feedback"
                element={<ArticleFeedbackManager />}
              />
              <Route
                path="topic-feedback"
                element={<TopicFeedbackManager />}
              />
              <Route path="grievances" element={<GrievancesManager />} />
              <Route path="bug-bounty" element={<BugBountyManager />} />
              <Route path="referral-code-logs" element={<ReferralCodeLogs />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
