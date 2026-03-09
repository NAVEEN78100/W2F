import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Search, Eye } from "lucide-react";
import { MessageSquare, Mail, Phone, MapPin, AlertCircle } from "lucide-react";

export default function SupportFeedbackManager() {
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [updating, setUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const queryClient = useQueryClient();

  const {
    data: feedbacks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["support-feedback"],
    queryFn: async () => {
      const response = await fetch("/api/support-feedback");
      if (!response.ok) throw new Error("Failed to fetch support feedback");
      return response.json();
    },
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      pending: "secondary",
      in_review: "default",
      resolved: "outline",
      closed: "destructive",
    };
    return variants[status] || "secondary";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const updateFeedbackStatus = async (feedbackId: string, status: string) => {
    setUpdating(true);
    try {
      const response = await fetch(
        `/api/support-feedback/${feedbackId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status, adminNotes }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update feedback status");
      }

      await queryClient.invalidateQueries({ queryKey: ["support-feedback"] });
      setShowModal(false);
      setSelectedFeedback(null);
      setAdminNotes("");
    } catch (err: any) {
      console.error("Error updating status:", err);
    } finally {
      setUpdating(false);
    }
  };

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch =
      feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.ticketId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || feedback.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Loading support requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-2 p-4 text-sm text-destructive bg-destructive/10 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Failed to load support feedback</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">
          Support Feedback
        </h1>
        <p className="text-muted-foreground mt-1">
          View and manage user support requests
        </p>
      </div>

      {feedbacks.length === 0 ? (
        <div className="admin-card p-12 text-center">
          <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">No support requests yet</p>
        </div>
      ) : (
        <>
          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by name, email, or ticket ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="w-48">
                  <Label htmlFor="status">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_review">In Review</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Table */}
          <Card>
            <CardHeader>
              <CardTitle>Support Requests ({filteredFeedbacks.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Ticket ID</TableHead>
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Contact</TableHead>
                      <TableHead className="font-semibold">Category</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Submitted</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeedbacks.map((feedback: any) => (
                      <TableRow key={feedback._id} className="hover:bg-muted/50">
                        <TableCell className="font-mono font-semibold text-primary">
                          {feedback.ticketId}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">
                              {feedback.name}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <Mail className="w-3 h-3" />
                              {feedback.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span>{feedback.contact}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <MapPin className="w-3 h-3" />
                            {feedback.city}, {feedback.state}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <p className="text-sm font-medium text-foreground truncate">
                              {feedback.issueCategory}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {feedback.platform}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadge(feedback.status)}>
                            {feedback.status.replace(/_/g, " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(feedback.createdAt)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedFeedback(feedback);
                              setShowModal(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="px-6 py-4 border-t border-border text-xs text-muted-foreground">
                Showing {filteredFeedbacks.length}{" "}
                {filteredFeedbacks.length === 1 ? "request" : "requests"}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Modal for viewing/updating feedback */}
      {showModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Support Request Details</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <Label>Ticket ID</Label>
                <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                  {selectedFeedback.ticketId}
                </p>
              </div>
              <div>
                <Label>Status</Label>
                <p>{getStatusBadge(selectedFeedback.status)}</p>
              </div>
              <div>
                <Label>Name</Label>
                <p>{selectedFeedback.name}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p>{selectedFeedback.email}</p>
              </div>
              <div>
                <Label>Contact</Label>
                <p>{selectedFeedback.contact}</p>
              </div>
              <div>
                <Label>State</Label>
                <p>{selectedFeedback.state}</p>
              </div>
              <div>
                <Label>City</Label>
                <p>{selectedFeedback.city}</p>
              </div>
              <div>
                <Label>Platform</Label>
                <p>{selectedFeedback.platform}</p>
              </div>
              <div>
                <Label>Issue Category</Label>
                <p>{selectedFeedback.issueCategory}</p>
              </div>
            </div>

            <div className="mb-6">
              <Label>Elaboration</Label>
              <div className="bg-gray-50 p-3 rounded mt-1">
                {selectedFeedback.elaboration}
              </div>
            </div>

            {selectedFeedback.evidenceFile && (
              <div className="mb-6">
                <Label>Evidence File</Label>
                <div className="mt-2 border rounded-lg p-2 bg-gray-50">
                  {(() => {
                    const filename = selectedFeedback.evidenceFile.split(/[/\\]/).pop();
                    const isPdf = filename.toLowerCase().endsWith('.pdf');
                    return isPdf ? (
                      <iframe
                        src={`/uploads/${filename}`}
                        className="w-full h-96 border rounded"
                        title="Evidence PDF"
                      />
                    ) : (
                      <img
                        src={`/uploads/${filename}`}
                        alt="Evidence"
                        className="max-w-full h-auto max-h-96 object-contain"
                      />
                    );
                  })()}
                  <p className="text-xs text-gray-500 mt-2">
                    {(() => {
                      const filename = selectedFeedback.evidenceFile.split(/[/\\]/).pop();
                      return (
                        <a
                          href={`/uploads/${filename}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Open in new tab
                        </a>
                      );
                    })()}
                  </p>
                </div>
              </div>
            )}

            <div className="mb-6">
              <Label htmlFor="adminNotes">Admin Notes</Label>
              <Textarea
                id="adminNotes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add notes about this support request..."
                rows={3}
              />
            </div>

            <div className="flex gap-4">
              <Select
                defaultValue={selectedFeedback.status}
                onValueChange={(value) =>
                  updateFeedbackStatus(selectedFeedback._id, value)
                }
                disabled={updating}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_review">In Review</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={() =>
                  updateFeedbackStatus(
                    selectedFeedback._id,
                    selectedFeedback.status,
                  )
                }
                disabled={updating}
              >
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Status"
                )}
              </Button>

              <Button variant="outline" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
