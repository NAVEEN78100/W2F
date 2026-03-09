import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RefreshCw, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { topicFeedbackApiUrl } from "@/lib/api-config";

interface TopicFeedback {
  _id: string;
  topicSlug: string;
  helpful: string;
  userAgent: string;
  ipAddress: string;
  createdAt: string;
}

interface FeedbackStats {
  total: number;
  helpful: number;
  notHelpful: number;
  helpfulPercentage: string;
}

const TopicFeedbackManager: React.FC = () => {
  const [feedback, setFeedback] = useState<TopicFeedback[]>([]);
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const [feedbackResponse, statsResponse] = await Promise.all([
        fetch(topicFeedbackApiUrl("/api/topic-feedback")),
        fetch(topicFeedbackApiUrl("/api/topic-feedback/stats")),
      ]);

      if (!feedbackResponse.ok || !statsResponse.ok) {
        throw new Error("Failed to fetch feedback data");
      }

      const feedbackData = await feedbackResponse.json();
      const statsData = await statsResponse.json();

      setFeedback(feedbackData);
      setStats(statsData);
      setError(null);
    } catch (err) {
      console.error("Error fetching feedback:", err);
      setError("Failed to load feedback data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchFeedback}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Topic Feedback Manager</h1>
        <p className="text-muted-foreground">
          Track topic feedback and user responses
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Feedback
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Helpful</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.helpful}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Not Helpful</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stats.notHelpful}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Helpful %</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.helpfulPercentage}%
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Feedback Table */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Topic Slug</TableHead>
                <TableHead>Helpful</TableHead>
                <TableHead>User Agent</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedback.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-mono text-sm">
                    {item.topicSlug}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.helpful === "Yes" ? "default" : "destructive"
                      }
                    >
                      {item.helpful}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className="max-w-xs truncate"
                    title={item.userAgent}
                  >
                    {item.userAgent}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {item.ipAddress}
                  </TableCell>
                  <TableCell>{formatDate(item.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {feedback.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No topic feedback found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TopicFeedbackManager;
