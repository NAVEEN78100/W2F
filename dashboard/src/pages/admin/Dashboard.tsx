import { useQuery } from "@tanstack/react-query";
import { FileText, FolderTree, TrendingUp, Clock, MessageSquare, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const { data: articles = [] } = useQuery({
    queryKey: ["articles-count"],
    queryFn: async () => {
      const response = await fetch("/api/articles");
      if (!response.ok) throw new Error("Failed to fetch articles");
      return response.json();
    },
  });

  const { data: topics = [] } = useQuery({
    queryKey: ["topics-count"],
    queryFn: async () => {
      const response = await fetch("/api/topics");
      if (!response.ok) throw new Error("Failed to fetch topics");
      return response.json();
    },
  });

  const articlesCount = articles.length;
  const topicsCount = topics.length;

  const stats = [
    {
      label: "Total Articles",
      value: articlesCount,
      icon: FileText,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Browse Topics",
      value: topicsCount,
      icon: FolderTree,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Published",
      value: articlesCount + topicsCount,
      icon: TrendingUp,
      color: "text-warning",
      bg: "bg-warning/10",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card animate-fade-in">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-3xl font-semibold text-foreground mt-2">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="admin-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/articles"
            className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
          >
            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Manage Articles</p>
              <p className="text-sm text-muted-foreground">
                Add, edit, or reorder articles
              </p>
            </div>
          </a>

          <a
            href="/admin/topics"
            className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-success/50 hover:bg-success/5 transition-all group"
          >
            <div className="p-3 rounded-lg bg-success/10 group-hover:bg-success/20 transition-colors">
              <FolderTree className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="font-medium text-foreground">Manage Topics</p>
              <p className="text-sm text-muted-foreground">
                Organize browse topics
              </p>
            </div>
          </a>

          <a
            href="/admin/support-feedback"
            className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
          >
            <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
              <MessageSquare className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="font-medium text-foreground">Support Feedback</p>
              <p className="text-sm text-muted-foreground">
                View user support requests
              </p>
            </div>
          </a>

          <a
            href="/admin/grievances"
            className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-red-500/50 hover:bg-red-500/5 transition-all group"
          >
            <div className="p-3 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="font-medium text-foreground">Grievance Redressal</p>
              <p className="text-sm text-muted-foreground">
                View grievance submissions
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="admin-card p-6 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">
            Getting Started
          </h2>
        </div>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>Welcome to your admin dashboard! Here's how to get started:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Add popular articles that users frequently search for</li>
            <li>Create browse topics to organize your content</li>
            <li>Drag and drop items to reorder them</li>
            <li>Toggle visibility to show/hide content</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
