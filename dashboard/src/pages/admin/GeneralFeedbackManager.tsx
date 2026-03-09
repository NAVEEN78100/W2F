import React, { useState, useEffect } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Search, Eye, Edit } from "lucide-react";
import { apiUrl } from "@/lib/api-config";

interface GeneralFeedback {
  _id: string;
  name: string;
  email: string;
  contact: string;
  state: string;
  city: string;
  section: string;
  feedbackType: string;
  feedbackDetails: string;
  helpful: string;
  recommend: string;
  status: "pending" | "in_review" | "resolved" | "closed";
  adminNotes: string;
  ticketId: string;
  referralCode: string | null;
  referralCodeUsed: boolean;
  createdAt: string;
  updatedAt: string;
}

const GeneralFeedbackManager = () => {
  const [feedbacks, setFeedbacks] = useState<GeneralFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedFeedback, setSelectedFeedback] = useState<GeneralFeedback | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(apiUrl("/api/general-feedback"));
      if (!response.ok) {
        throw new Error("Failed to fetch feedbacks");
      }
      const data = await response.json();
      setFeedbacks(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateFeedbackStatus = async (feedbackId: string, status: string) => {
    setUpdating(true);
    try {
      const response = await fetch(apiUrl(`/api/general-feedback/${feedbackId}/status`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, adminNotes }),
      });

      if (!response.ok) {
        throw new Error("Failed to update feedback status");
      }

      await fetchFeedbacks();
      setShowModal(false);
      setSelectedFeedback(null);
      setAdminNotes("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      in_review: "default",
      resolved: "outline",
      closed: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status.replace("_", " ")}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">General Feedback Management</h1>
        <p className="text-muted-foreground">
          Manage and respond to user feedback submissions
        </p>
      </div>

      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

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
          <CardTitle>Feedback Submissions ({filteredFeedbacks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Feedback Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeedbacks.map((feedback) => (
                <TableRow key={feedback._id}>
                  <TableCell className="font-mono text-sm">
                    {feedback.ticketId}
                  </TableCell>
                  <TableCell>{feedback.name}</TableCell>
                  <TableCell>{feedback.email}</TableCell>
                  <TableCell>{feedback.section}</TableCell>
                  <TableCell>{feedback.feedbackType}</TableCell>
                  <TableCell>{getStatusBadge(feedback.status)}</TableCell>
                  <TableCell>
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedFeedback(feedback);
                          setAdminNotes(feedback.adminNotes);
                          setShowModal(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal for viewing/updating feedback */}
      {showModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Feedback Details</h2>

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
                <Label>Section</Label>
                <p>{selectedFeedback.section}</p>
              </div>
              <div>
                <Label>Feedback Type</Label>
                <p>{selectedFeedback.feedbackType}</p>
              </div>
              <div>
                <Label>Referral Code</Label>
                <p className="font-mono text-sm">
                  {selectedFeedback.referralCode || "Not generated"}
                  {selectedFeedback.referralCodeUsed && (
                    <Badge variant="outline" className="ml-2">
                      Used
                    </Badge>
                  )}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <Label>Feedback Details</Label>
              <div className="bg-gray-50 p-3 rounded mt-1">
                {selectedFeedback.feedbackDetails}
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="adminNotes">Admin Notes</Label>
              <Textarea
                id="adminNotes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add notes about this feedback..."
                rows={3}
              />
            </div>

            <div className="flex gap-4">
              <Select
                defaultValue={selectedFeedback.status}
                onValueChange={(value) => updateFeedbackStatus(selectedFeedback._id, value)}
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
                onClick={() => updateFeedbackStatus(selectedFeedback._id, selectedFeedback.status)}
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
};

export default GeneralFeedbackManager;
