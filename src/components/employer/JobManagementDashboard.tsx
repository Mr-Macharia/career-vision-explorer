
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Eye, 
  BarChart3,
  MapPin,
  Calendar,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface JobData {
  id: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
  status: 'active' | 'draft' | 'expired';
  applicants: number;
  views: number;
  isBoosted: boolean;
}

interface ApplicantData {
  id: string;
  name: string;
  appliedDate: string;
  matchScore: number;
  status: 'Applied' | 'Reviewing' | 'Interview' | 'Hired' | 'Rejected';
  jobTitle: string;
}

export const JobManagementDashboard = () => {
  // Mock data - in real app this would come from API
  const jobs: JobData[] = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $160,000",
      postedDate: "2024-03-10",
      status: "active",
      applicants: 12,
      views: 45,
      isBoosted: true
    },
    {
      id: "2",
      title: "Product Manager",
      location: "Remote",
      type: "Full-time",
      salary: "$100,000 - $140,000",
      postedDate: "2024-03-08",
      status: "active",
      applicants: 8,
      views: 32,
      isBoosted: false
    },
    {
      id: "3",
      title: "UX Designer",
      location: "New York, NY",
      type: "Contract",
      salary: "$80,000 - $100,000",
      postedDate: "2024-03-05",
      status: "draft",
      applicants: 5,
      views: 18,
      isBoosted: false
    }
  ];

  const recentApplicants: ApplicantData[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      appliedDate: "2024-03-14",
      matchScore: 92,
      status: "Interview",
      jobTitle: "Senior Frontend Developer"
    },
    {
      id: "2",
      name: "Mike Chen",
      appliedDate: "2024-03-13",
      matchScore: 88,
      status: "Reviewing",
      jobTitle: "Product Manager"
    },
    {
      id: "3",
      name: "Emily Davis",
      appliedDate: "2024-03-12",
      matchScore: 85,
      status: "Applied",
      jobTitle: "UX Designer"
    }
  ];

  // Calculate statistics
  const stats = {
    totalJobs: jobs.length,
    boostedJobs: jobs.filter(job => job.isBoosted).length,
    totalApplicants: jobs.reduce((sum, job) => sum + job.applicants, 0),
    totalViews: jobs.reduce((sum, job) => sum + job.views, 0),
    conversionRate: jobs.reduce((sum, job) => sum + job.views, 0) > 0 
      ? ((jobs.reduce((sum, job) => sum + job.applicants, 0) / jobs.reduce((sum, job) => sum + job.views, 0)) * 100)
      : 0
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getApplicantStatusColor = (status: string) => {
    switch (status) {
      case "Hired":
        return "bg-green-100 text-green-800";
      case "Interview":
        return "bg-blue-100 text-blue-800";
      case "Reviewing":
        return "bg-yellow-100 text-yellow-800";
      case "Applied":
        return "bg-gray-100 text-gray-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
          <p className="text-gray-600">Manage your job postings and track applications</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Post New Job
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalJobs}</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Boosted Jobs</p>
                <p className="text-3xl font-bold text-green-600">{stats.boostedJobs}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applicants</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalApplicants}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-3xl font-bold text-orange-600">{stats.totalViews}</p>
              </div>
              <Eye className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-3xl font-bold text-red-600">{stats.conversionRate.toFixed(1)}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search jobs by title, location, or description..."
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select defaultValue="all-types">
                <SelectTrigger className="w-40">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-time">
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="7-days">Last 7 days</SelectItem>
                  <SelectItem value="30-days">Last 30 days</SelectItem>
                  <SelectItem value="90-days">Last 90 days</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Boosted Only
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Listings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Job Listings ({jobs.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[250px]">Job Details</TableHead>
                  <TableHead className="min-w-[180px]">Location & Type</TableHead>
                  <TableHead className="min-w-[120px]">Posted</TableHead>
                  <TableHead className="min-w-[140px]">Performance</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[120px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id} className={job.isBoosted ? "bg-green-50 border-green-200" : ""}>
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <div className="font-medium flex items-center gap-2">
                          {job.title}
                          {job.isBoosted && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Boosted
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{job.salary}</div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Briefcase className="h-3 w-3 text-gray-400" />
                          {job.type}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        {new Date(job.postedDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{job.applicants} applicants</div>
                        <div className="text-sm text-gray-500">{job.views} views</div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge className={getStatusColor(job.status)} variant="outline">
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Applicants
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Job
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Applications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Applications</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Applicant</TableHead>
                  <TableHead className="min-w-[180px]">Job Applied</TableHead>
                  <TableHead className="min-w-[120px]">Applied</TableHead>
                  <TableHead className="min-w-[120px]">Match Score</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[120px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentApplicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell className="py-4">
                      <div className="font-medium">{applicant.name}</div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-sm">{applicant.jobTitle}</div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-sm">{new Date(applicant.appliedDate).toLocaleDateString()}</div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">{applicant.matchScore}%</div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${applicant.matchScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge className={getApplicantStatusColor(applicant.status)} variant="outline">
                        {applicant.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 text-right">
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
