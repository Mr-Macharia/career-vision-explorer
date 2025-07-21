
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Calendar, Clock, TrendingUp, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useJobPosts } from "@/hooks/use-job-posts";
import { useApplicants } from "@/hooks/use-applicants";
import { useInterviews } from "@/hooks/use-interviews";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  iconColor: string;
  bgColor: string;
  trend?: string;
  onClick: () => void;
}

const StatCard = ({ title, value, subtitle, icon, iconColor, bgColor, trend, onClick }: StatCardProps) => (
  <Card 
    onClick={onClick} 
    className="cursor-pointer hover:shadow-md transition-all duration-200 border border-border bg-card"
  >
    <CardContent className="p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className={`${bgColor} p-2 rounded-lg`}>
            <div className={iconColor}>{icon}</div>
          </div>
          <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground opacity-60" />
        </div>
        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
          <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
          {trend && (
            <div className="flex items-center">
              <TrendingUp className="h-3 w-3 text-success mr-1" />
              <span className="text-xs font-medium text-success">{trend}</span>
            </div>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

export const StatisticsCards = () => {
  const navigate = useNavigate();
  const { jobs } = useJobPosts();
  const { applicants } = useApplicants();
  const { interviews } = useInterviews();
  
  // Calculate boosted listings
  const boostedListings = jobs.filter(job => job.isBoosted).length;
  
  // Calculate weekly new applicants
  const weeklyNewApplicants = applicants.filter(app => 
    app.appliedTime.includes("day") && parseInt(app.appliedTime) <= 7
  ).length;
  
  // Calculate weekly interviews
  const weeklyInterviews = interviews.filter(int => 
    new Date(int.scheduledDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ).length;
  
  // Calculate total views
  const totalViews = jobs.reduce((total, job) => total + job.views, 0);
  const viewsIncrease = "+18%"; // This would typically be calculated from historical data

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      <StatCard
        title="Active Jobs"
        value={jobs.length}
        subtitle={`${boostedListings} boosted`}
        icon={<Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />}
        iconColor="text-primary"
        bgColor="bg-primary/10"
        trend="+12%"
        onClick={() => navigate("/employer/jobs")}
      />
      <StatCard
        title="Applicants"
        value={applicants.length}
        subtitle={`+${weeklyNewApplicants} this week`}
        icon={<Users className="h-4 w-4 sm:h-5 sm:w-5" />}
        iconColor="text-secondary-foreground"
        bgColor="bg-secondary/10"
        trend="+23%"
        onClick={() => navigate("/employer/applicants")}
      />
      <StatCard
        title="Interviews"
        value={interviews.filter(i => i.status === "Scheduled").length}
        subtitle={`${weeklyInterviews} this week`}
        icon={<Calendar className="h-4 w-4 sm:h-5 sm:w-5" />}
        iconColor="text-accent-foreground"
        bgColor="bg-accent/10"
        trend="+8%"
        onClick={() => navigate("/employer/interviews")}
      />
      <StatCard
        title="Views"
        value={totalViews.toLocaleString()}
        subtitle={`${viewsIncrease} monthly`}
        icon={<Clock className="h-4 w-4 sm:h-5 sm:w-5" />}
        iconColor="text-muted-foreground"
        bgColor="bg-muted/50"
        trend="+18%"
        onClick={() => navigate("/employer/jobs")}
      />
    </div>
  );
};
