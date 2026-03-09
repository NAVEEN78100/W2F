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
import { Alert, AlertDescription } from "@/components/ui/alert";
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

interface BugBounty {
  _id: string;
  name: string;
  email: string;
  contact: string;
  state: string;
  city: string;
  operatingSystem: string;
  bugDescription: string;
  referenceFile?: string;
  ticketId: string;
  status: "pending" | "in_review" | "resolved" | "closed";
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function BugBountyManager() {
  const [selectedBugBounty, setSelectedBugBounty] = useState<BugBounty | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [updating, setUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const queryClient = useQueryClient();

  const {
    data: bugBounties = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bugBounties"],
    queryFn: async () => {
      const response = await fetch("/api/bug-bounty");
      if (!response.ok) throw new Error("Failed to fetch bug bounties");
      return response.json();
    },
  });

  const updateBugBountyStatus = async (bugBountyId: string, status: string) => {
    setUpdating(true);
    try {
      const response = await fetch(`/api/bug-bounty/${bugBountyId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, adminNotes }),
      });

      if (!response.ok) {
        throw new Error("Failed to update bug bounty status");
      }

      await queryClient.invalidateQueries({ queryKey: ["bugBounties"] });
      setShowModal(false);
      setSelectedBugBounty(null);
      setAdminNotes("");
    } catch (err: unknown) {
      console.error("Error updating status:", err);
    } finally {
      setUpdating(false);
    }
  };

  const filteredBugBounties = bugBounties.filter((bugBounty: BugBounty) => {
    const matchesSearch =
      bugBounty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bugBounty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bugBounty.ticketId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || bugBounty.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "in_review":
        return "default";
      case "resolved":
        return "default";
      case "closed":
        return "outline";
      default:
        return "secondary";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-500">Error loading bug bounties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Bug Bounty Management</h1>
        <p className="text-muted-foreground">
          Track and manage bug bounty reports and submissions
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
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in_review">In Review</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Bug Bounty Reports ({filteredBugBounties.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Operating System</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBugBounties.map((bugBounty: BugBounty) => (
                <TableRow key={bugBounty._id}>
                  <TableCell className="font-mono font-semibold">
                    {bugBounty.ticketId}
                  </TableCell>
                  <TableCell>{bugBounty.name}</TableCell>
                  <TableCell>{bugBounty.email}</TableCell>
                  <TableCell>{bugBounty.operatingSystem}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(bugBounty.status)}>
                      {bugBounty.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(bugBounty.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedBugBounty(bugBounty);
                        setAdminNotes(bugBounty.adminNotes || "");
                        setShowModal(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal */}
      {showModal && selectedBugBounty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Bug Bounty Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label className="font-semibold">Ticket ID</Label>
                <p className="font-mono text-lg">
                  {selectedBugBounty.ticketId}
                </p>
              </div>
              <div>
                <Label className="font-semibold">Status</Label>
                <Badge
                  variant={getStatusBadgeVariant(selectedBugBounty.status)}
                  className="mt-1"
                >
                  {selectedBugBounty.status.replace("_", " ").toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{selectedBugBounty.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{selectedBugBounty.contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>
                  {selectedBugBounty.city}, {selectedBugBounty.state}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{selectedBugBounty.operatingSystem}</span>
              </div>
            </div>

            <div className="mb-6">
              <Label className="font-semibold">Bug Description</Label>
              <p className="mt-2 p-3 bg-gray-50 rounded-lg">
                {selectedBugBounty.bugDescription}
              </p>
            </div>

            {selectedBugBounty.referenceFile && (
              <div className="mb-6">
                <Label className="font-semibold">Reference File</Label>
                <div className="mt-2 border rounded-lg p-2 bg-gray-50">
                  {(() => {
                    const filename = selectedBugBounty.referenceFile
                      .split(/[/\\]/)
                      .pop();
                    const isPdf = filename.toLowerCase().endsWith(".pdf");
                    return isPdf ? (
                      <iframe
                        src={`/uploads/${filename}`}
                        className="w-full h-96 border rounded"
                        title="Reference PDF"
                      />
                    ) : (
                      <img
                        src={`/uploads/${filename}`}
                        alt="Reference"
                        className="max-w-full h-auto max-h-96 object-contain"
                      />
                    );
                  })()}
                  <p className="text-xs text-gray-500 mt-2">
                    {(() => {
                      const filename = selectedBugBounty.referenceFile
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
                placeholder="Add notes about this bug bounty..."
                rows={3}
              />
            </div>

            <div className="flex gap-4">
              <Select
                defaultValue={selectedBugBounty.status}
                onValueChange={(value) =>
                  updateBugBountyStatus(selectedBugBounty._id, value)
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
                  updateBugBountyStatus(
                    selectedBugBounty._id,
                    selectedBugBounty.status,
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
