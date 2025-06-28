
import React from "react";
import { Briefcase, Eye, Calendar, Star } from "lucide-react";
import { StatCard } from "./StatCard";
import { useJobApplications } from "@/hooks/use-job-applications";
import { useProfile } from "@/hooks/use-user-profile";

export const QuickStatsCards = () => {
  const { applications, isLoading: applicationsLoading } = useJobApplications();
  const { profile, isLoading: profileLoading } = useProfile();

  const stats = [
    {
      icon: Briefcase,
      value: applicationsLoading ? "..." : applications.length.toString(),
      label: "Applications",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Eye,
      value: "0", // Placeholder for now
      label: "Profile Views",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Calendar,
      value: "0", // Placeholder for now
      label: "Interviews",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Star,
      value: profileLoading ? "..." : `${profile?.profile_completeness || 0}%`,
      label: "Profile Score",
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          gradient={stat.gradient}
        />
      ))}
    </div>
  );
};
