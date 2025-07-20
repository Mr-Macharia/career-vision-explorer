
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
      <div className="space-y-4 md:space-y-6 p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-background to-muted/30 min-h-screen">
        {/* Welcome Section */}
        <div className="bg-card rounded-lg md:rounded-xl shadow-sm border border-border p-3 sm:p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate">
                Welcome Back!
              </h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base lg:text-lg">
                Manage your job postings and connect with top talent
              </p>
            </div>
            <div className="flex-shrink-0 self-start sm:self-center">
              <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Job Post Header */}
        <div className="bg-card rounded-lg md:rounded-xl shadow-sm border border-border overflow-hidden">
          <JobPostHeader />
        </div>

        {/* Statistics Cards */}
        <div className="bg-card rounded-lg md:rounded-xl shadow-sm border border-border p-3 sm:p-4 lg:p-6">
          <div className="flex items-center mb-3 sm:mb-4 lg:mb-6">
            <div className="bg-primary/10 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3">
              <Briefcase className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
            </div>
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground">Quick Overview</h2>
          </div>
          <StatisticsCards />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {/* Messages from Freelancers */}
          <div className="order-1 md:order-1 xl:order-1">
            <MessagesFromFreelancers />
          </div>
          
          {/* Job Listings */}
          <Card className="order-2 md:order-2 xl:order-2 shadow-sm border-border hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-0">
              <div className="p-3 sm:p-4 lg:p-6 border-b border-border">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3">
                    <Briefcase className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                  </div>
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground">Active Jobs</h2>
                </div>
              </div>
              <div className="p-3 sm:p-4 lg:p-6">
                <JobListingsTable />
              </div>
            </CardContent>
          </Card>

          {/* Recent Applicants */}
          <Card className="order-3 md:order-3 xl:order-3 md:col-span-2 xl:col-span-1 shadow-sm border-border hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-0">
              <div className="p-3 sm:p-4 lg:p-6 border-b border-border">
                <div className="flex items-center">
                  <div className="bg-accent/10 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3">
                    <Users className="h-4 w-4 lg:h-5 lg:w-5 text-accent-foreground" />
                  </div>
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground">Recent Applications</h2>
                </div>
              </div>
              <div className="p-3 sm:p-4 lg:p-6">
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
