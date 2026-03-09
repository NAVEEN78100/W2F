import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Loader2, Search, Calendar } from "lucide-react";
import { apiUrl } from "@/lib/api-config";

interface ReferralCodeLog {
  _id: string;
  code: string;
  isUsed: boolean;
  usedBy: string | null;
  usedAt: string | null;
  expiresAt: string;
  createdAt: string;
  feedbackTicketId?: string;
}

const ReferralCodeLogs = () => {
  const [logs, setLogs] = useState<ReferralCodeLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchReferralLogs();
  }, []);

  const fetchReferralLogs = async () => {
    try {
      const response = await fetch(apiUrl("/api/general-feedback/referral-logs"));
      if (!response.ok) {
        throw new Error("Failed to fetch referral logs");
      }
      const data = await response.json();
      setLogs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.usedBy && log.usedBy.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "used" && log.isUsed) ||
      (statusFilter === "unused" && !log.isUsed) ||
      (statusFilter === "expired" && new Date(log.expiresAt) < new Date() && !log.isUsed);

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (log: ReferralCodeLog) => {
    const now = new Date();
    const expiresAt = new Date(log.expiresAt);

    if (log.isUsed) {
      return <Badge variant="outline">Used</Badge>;
    } else if (expiresAt < now) {
      return <Badge variant="destructive">Expired</Badge>;
    } else {
      return <Badge variant="secondary">Active</Badge>;
    }
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
        <h1 className="text-3xl font-bold">Referral Code Logs</h1>
        <p className="text-muted-foreground">
          Track referral code usage and redemption history
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
                  placeholder="Search by code or user email..."
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
                <option value="all">All Status</option>
                <option value="used">Used</option>
                <option value="unused">Unused</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Referral Code Activity ({filteredLogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Used By</TableHead>
                <TableHead>Used At</TableHead>
                <TableHead>Expires At</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log._id}>
                  <TableCell className="font-mono text-sm">
                    {log.code}
                  </TableCell>
                  <TableCell>{getStatusBadge(log)}</TableCell>
                  <TableCell>{log.usedBy || "Not used"}</TableCell>
                  <TableCell>
                    {log.usedAt ? new Date(log.usedAt).toLocaleString() : "Not used"}
                  </TableCell>
                  <TableCell>
                    {new Date(log.expiresAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(log.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralCodeLogs;
