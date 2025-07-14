
import React from "react";
import { ProfileCompletionCard } from "./ProfileCompletionCard";
import { RecentActivityCard } from "./RecentActivityCard";
import { QuickActionsCard } from "./QuickActionsCard";

export const OverviewTab = () => {
  return (
    <div className="space-y-8">
      <QuickActionsCard />
      <div className="grid lg:grid-cols-2 gap-6">
        <ProfileCompletionCard />
        <RecentActivityCard />
      </div>
    </div>
  );
};
