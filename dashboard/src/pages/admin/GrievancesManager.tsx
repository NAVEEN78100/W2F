import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import {
  Loader2,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  FileText,
  Eye,
  Search,
} from "lucide-react";

interface Grievance {
  _id: string;
  name: string;
  email: string;
  contact: string;
  state: string;
  city: string;
  platform: string;
  issueCategory: string;
  elaboration: string;
  incidentDate?: string;
  evidenceFile?: string;
  status: "pending" | "in_review" | "resolved" | "closed";
  adminNotes: string;
  ticketId: string;
  createdAt: string;
  updatedAt: string;
}

export default function GrievancesManager() {
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [updating, setUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const queryClient = useQueryClient();

  const {
    data: grievances = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["grievances"],
    queryFn: async () => {
      const response = await fetch("/api/grievances");
      if (!response.ok) throw new Error("Failed to fetch grievances");
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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Data Privacy Violation": "bg-red-100 text-red-800",
      "Payment Issues": "bg-orange-100 text-orange-800",
      "Harassment or Misconduct": "bg-purple-100 text-purple-800",
      "Platform Abuse": "bg-pink-100 text-pink-800",
      "Legal or Compliance Issue": "bg-blue-100 text-blue-800",
      Other: "bg-gray-100 text-gray-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
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

  const updateGrievanceStatus = async (grievanceId: string, status: string) => {
    setUpdating(true);
    try {
      const response = await fetch(`/api/grievances/${grievanceId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, adminNotes }),
      });

      if (!response.ok) {
        throw new Error("Failed to update grievance status");
      }

      await queryClient.invalidateQueries({ queryKey: ["grievances"] });
      setShowModal(false);
      setSelectedGrievance(null);
      setAdminNotes("");
    } catch (err: unknown) {
      console.error("Error updating status:", err);
    } finally {
      setUpdating(false);
    }
  };

  const filteredGrievances = grievances.filter((grievance) => {
    const matchesSearch =
      grievance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grievance.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grievance.ticketId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || grievance.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Loading grievances...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-2 p-4 text-sm text-destructive bg-destructive/10 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Failed to load grievances</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">
          Grievance Redressal
        </h1>
        <p className="text-muted-foreground mt-1">
          View and manage user grievance submissions
        </p>
      </div>

      {grievances.length === 0 ? (
        <div className="admin-card p-12 text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">No grievances yet</p>
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

          {/* Grievances Table */}
          <Card>
            <CardHeader>
              <CardTitle>Grievances ({filteredGrievances.length})</CardTitle>
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
                      <TableHead className="font-semibold">Platform</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Submitted</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGrievances.map((grievance: Grievance) => (
                      <TableRow
                        key={grievance._id}
                        className="hover:bg-muted/50"
                      >
                        <TableCell className="font-mono font-semibold text-primary">
                          {grievance.ticketId}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">
                              {grievance.name}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <Mail className="w-3 h-3" />
                              <span>{grievance.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-foreground">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{grievance.contact}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(grievance.issueCategory)}`}
                          >
                            {grievance.issueCategory}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-foreground">
                            {grievance.platform}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusBadge(grievance.status)}
                            className="capitalize"
                          >
                            {grievance.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatDate(grievance.createdAt)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedGrievance(grievance);
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
            </CardContent>
          </Card>
        </>
      )}

      {/* Summary Stats */}
      {grievances.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="admin-card p-4">
            <p className="text-sm text-muted-foreground mb-2">
              Total Grievances
            </p>
            <p className="text-2xl font-bold text-foreground">
              {grievances.length}
            </p>
          </div>
          <div className="admin-card p-4">
            <p className="text-sm text-muted-foreground mb-2">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {
                grievances.filter((g: Grievance) => g.status === "pending")
                  .length
              }
            </p>
          </div>
          <div className="admin-card p-4">
            <p className="text-sm text-muted-foreground mb-2">In Review</p>
            <p className="text-2xl font-bold text-blue-600">
              {
                grievances.filter((g: Grievance) => g.status === "in_review")
                  .length
              }
            </p>
          </div>
          <div className="admin-card p-4">
            <p className="text-sm text-muted-foreground mb-2">Resolved</p>
            <p className="text-2xl font-bold text-green-600">
              {
                grievances.filter((g: Grievance) => g.status === "resolved")
                  .length
              }
            </p>
          </div>
        </div>
      )}

      {/* Modal for viewing/updating grievance */}
      {showModal && selectedGrievance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Grievance Details</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <Label>Ticket ID</Label>
                <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                  {selectedGrievance.ticketId}
                </p>
              </div>
              <div>
                <Label>Status</Label>
                <p>{getStatusBadge(selectedGrievance.status)}</p>
              </div>
              <div>
                <Label>Name</Label>
                <p>{selectedGrievance.name}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p>{selectedGrievance.email}</p>
              </div>
              <div>
                <Label>Contact</Label>
                <p>{selectedGrievance.contact}</p>
              </div>
              <div>
                <Label>State</Label>
                <p>{selectedGrievance.state}</p>
              </div>
              <div>
                <Label>City</Label>
                <p>{selectedGrievance.city}</p>
              </div>
              <div>
                <Label>Platform</Label>
                <p>{selectedGrievance.platform}</p>
              </div>
              <div>
                <Label>Issue Category</Label>
                <p>{selectedGrievance.issueCategory}</p>
              </div>
              <div>
                <Label>Incident Date</Label>
                <p>{selectedGrievance.incidentDate || "Not provided"}</p>
              </div>
            </div>

            <div className="mb-6">
              <Label>Elaboration</Label>
              <div className="bg-gray-50 p-3 rounded mt-1">
                {selectedGrievance.elaboration}
              </div>
            </div>

            {selectedGrievance.evidenceFile && (
              <div className="mb-6">
                <Label>Evidence File</Label>
                <div className="mt-2 border rounded-lg p-2 bg-gray-50">
                  {(() => {
                    const filename = selectedGrievance.evidenceFile
                      .split(/[/\\]/)
                      .pop();
                    const isPdf = filename.toLowerCase().endsWith(".pdf");
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
                      const filename = selectedGrievance.evidenceFile
                        .split(/[/\\]/)
                        .pop();
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
                placeholder="Add notes about this grievance..."
                rows={3}
              />
            </div>

            <div className="flex gap-4">
              <Select
                defaultValue={selectedGrievance.status}
                onValueChange={(value) =>
                  updateGrievanceStatus(selectedGrievance._id, value)
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
                  updateGrievanceStatus(
                    selectedGrievance._id,
                    selectedGrievance.status,
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
