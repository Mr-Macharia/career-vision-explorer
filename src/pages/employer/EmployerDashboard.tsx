
import React from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { JobPostHeader } from "@/components/employer/JobPostHeader";
import { StatisticsCards } from "@/components/employer/StatisticsCards";
import { RecentApplicantsTable } from "@/components/employer/RecentApplicantsTable";
import { JobListingsTable } from "@/components/employer/JobListingsTable";
import { MessagesFromFreelancers } from "@/components/employer/MessagesFromFreelancers";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Briefcase, MessageCircle } from "lucide-react";

const EmployerDashboard = () => {
  return (
    <DashboardLayout title="Employer Dashboard" role="employer">
      <div className="space-y-6 p-4 lg:p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        {/* Welcome Section */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Welcome Back!
              </h1>
              <p className="text-muted-foreground mt-1 lg:mt-2 text-base lg:text-lg">
                Manage your job postings and connect with top talent
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Job Post Header */}
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <JobPostHeader />
        </div>

        {/* Statistics Cards */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 lg:p-6">
          <div className="flex items-center mb-4 lg:mb-6">
            <div className="bg-primary/10 p-2 rounded-lg mr-3">
              <Briefcase className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
            </div>
            <h2 className="text-lg lg:text-xl font-semibold text-foreground">Quick Overview</h2>
          </div>
          <StatisticsCards />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* Messages from Freelancers */}
          <div className="lg:col-span-1">
            <MessagesFromFreelancers />
          </div>
          
          {/* Job Listings */}
          <Card className="shadow-sm border-border hover:shadow-md transition-shadow duration-200 lg:col-span-1">
            <CardContent className="p-0">
              <div className="p-4 lg:p-6 border-b border-border">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-lg mr-3">
                    <Briefcase className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                  </div>
                  <h2 className="text-lg lg:text-xl font-semibold text-foreground">Active Job Listings</h2>
                </div>
              </div>
              <div className="p-4 lg:p-6">
                <JobListingsTable />
              </div>
            </CardContent>
          </Card>

          {/* Recent Applicants */}
          <Card className="shadow-sm border-border hover:shadow-md transition-shadow duration-200 lg:col-span-2 xl:col-span-1">
            <CardContent className="p-0">
              <div className="p-4 lg:p-6 border-b border-border">
                <div className="flex items-center">
                  <div className="bg-green-500/10 p-2 rounded-lg mr-3">
                    <Users className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
                  </div>
                  <h2 className="text-lg lg:text-xl font-semibold text-foreground">Recent Applications</h2>
                </div>
              </div>
              <div className="p-4 lg:p-6">
                <RecentApplicantsTable />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Spacing */}
        <div className="h-4 lg:h-8"></div>
      </div>
    </DashboardLayout>
  );
};

export default EmployerDashboard;
