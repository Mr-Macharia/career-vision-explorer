
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Calendar, ExternalLink, Users } from "lucide-react";
import { useApplicants } from "@/hooks/use-applicants";
import { ApplicantProfileDialog } from "./ApplicantProfileDialog";
import { useNavigate } from "react-router-dom";

export const RecentApplicantsTable = () => {
  const { applicants, updateApplicantStatus } = useApplicants();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const recentApplicants = applicants
    .filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      // Sort by most recent first (this is simplified)
      const aTime = a.appliedTime.includes("day") ? parseInt(a.appliedTime) : 10;
      const bTime = b.appliedTime.includes("day") ? parseInt(b.appliedTime) : 10;
      return aTime - bTime;
    })
    .slice(0, 5); // Only show 5 most recent

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (score >= 80) return "bg-green-100 text-green-700 border-green-200";
    if (score >= 70) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Reviewing":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Interview":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Hired":
        return "bg-green-100 text-green-700 border-green-200";
      case "Rejected":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };
  
  const handleScheduleInterview = (applicantId: string) => {
    updateApplicantStatus(applicantId, "Interview");
    // Navigate to interview scheduling page
    navigate("/employer/interviews/schedule");
  };
  
  const handleViewAllApplicants = () => {
    navigate("/employer/applicants");
  };

  return (
    <div className="space-y-3">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">Recent Applications</h3>
          <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
            Latest candidate applications
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-9 h-8 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleViewAllApplicants}
            className="whitespace-nowrap h-8 px-3"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            View All
          </Button>
        </div>
      </div>

      {/* Compact Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-medium text-foreground text-sm">Candidate</TableHead>
              <TableHead className="font-medium text-foreground text-sm hidden sm:table-cell">Position</TableHead>
              <TableHead className="font-medium text-foreground text-sm hidden md:table-cell">Applied</TableHead>
              <TableHead className="font-medium text-foreground text-sm text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentApplicants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                  <div className="flex flex-col items-center">
                    <Users className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm">No recent applicants</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              recentApplicants.map((applicant) => (
                <ApplicantProfileDialog
                  key={applicant.id}
                  applicant={applicant}
                  onStatusChange={updateApplicantStatus}
                  onScheduleInterview={handleScheduleInterview}
                >
                  <TableRow className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground font-medium text-xs sm:text-sm">
                          {applicant.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-foreground text-sm truncate">{applicant.name}</p>
                          <p className="text-xs text-muted-foreground sm:hidden truncate">{applicant.position}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className="text-foreground text-sm">{applicant.position}</span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-muted-foreground text-xs">{applicant.appliedTime}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="h-6 w-6 p-0"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        {applicant.status === "Reviewing" && (
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleScheduleInterview(applicant.id);
                            }}
                            className="h-6 px-2 text-xs"
                          >
                            <Calendar className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                </ApplicantProfileDialog>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
