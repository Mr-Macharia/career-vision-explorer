
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditJobDialog } from "./EditJobDialog";
import { BoostJobDialog } from "./BoostJobDialog";
import { deleteJobDialog } from "@/lib/utils";
import { Eye, Edit, Trash, List, Search, Filter, MapPin, Briefcase, Plus, TrendingUp } from "lucide-react";
import { useJobPosts, JobPost } from "@/hooks/use-job-posts";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { JobListingsStats } from "./JobListingsStats";
import { JobListingsFilters } from "./JobListingsFilters";
import { JobListingsActions } from "./JobListingsActions";

export function JobListingsTable() {
  const { filteredJobs, removeJob, updateFilters, filters } = useJobPosts();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(filters.searchQuery || "");
  
  const handleViewApplicants = (jobId: string) => {
    navigate(`/employer/jobs/${jobId}/applicants`);
  };
  
  const handleDelete = (job: JobPost) => {
    deleteJobDialog({
      title: `Delete ${job.title}?`,
      description: "This will permanently delete this job listing and cannot be undone.",
      onConfirm: () => removeJob(job.id),
    });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    updateFilters({ searchQuery: value });
  };

  const handleJobTypeFilter = (type: string) => {
    updateFilters({ jobType: type === "all" ? undefined : type });
  };

  const handleDateRangeFilter = (days: string) => {
    updateFilters({ dateRange: days === "all" ? undefined : parseInt(days) });
  };

  const handleBoostedFilter = (boostedOnly: boolean) => {
    updateFilters({ boostedOnly });
  };

  // Sort jobs to show boosted ones first
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (a.isBoosted && !b.isBoosted) return -1;
    if (!a.isBoosted && b.isBoosted) return 1;
    return 0;
  });

  const stats = {
    total: filteredJobs.length,
    boosted: filteredJobs.filter(job => job.isBoosted).length,
    active: filteredJobs.length,
    totalApplicants: filteredJobs.reduce((sum, job) => sum + job.applicants, 0),
    totalViews: filteredJobs.reduce((sum, job) => sum + job.views, 0)
  };

  return (
    <div className="space-y-6">
      <JobListingsStats stats={stats} />

      <JobListingsFilters 
        searchTerm={searchTerm}
        filters={filters}
        onSearch={handleSearch}
        onJobTypeFilter={handleJobTypeFilter}
        onDateRangeFilter={handleDateRangeFilter}
        onBoostedFilter={handleBoostedFilter}
      />

      {/* Enhanced Job Listings Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Job Listings ({sortedJobs.length})</CardTitle>
            <CardDescription>
              Manage your job postings and view their performance
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {sortedJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No jobs found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || filters.jobType || filters.boostedOnly 
                  ? "Try adjusting your filters to see more results"
                  : "Get started by posting your first job"
                }
              </p>
              {(!searchTerm && !filters.jobType && !filters.boostedOnly) && (
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Post New Job
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Details</TableHead>
                  <TableHead>Location & Type</TableHead>
                  <TableHead>Posted</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedJobs.map((job) => (
                  <TableRow key={job.id} className={job.isBoosted ? "bg-green-50 border-green-200" : ""}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium flex items-center gap-2">
                          {job.title}
                          {job.isBoosted && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Boosted
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{job.salary}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Briefcase className="h-3 w-3" />
                          {job.type}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {formatDistanceToNow(new Date(job.datePosted), { addSuffix: true })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{job.applicants} applicants</div>
                        <div className="text-sm text-muted-foreground">{job.views} views</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {job.isBoosted ? (
                        <Badge className="bg-green-100 text-green-800">Boosted</Badge>
                      ) : (
                        <Badge variant="outline">Standard</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <JobListingsActions 
                        job={job}
                        onViewApplicants={handleViewApplicants}
                        onDelete={handleDelete}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
