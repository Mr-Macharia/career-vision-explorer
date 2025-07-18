
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./OverviewTab";
import { JobRecommendationsTab } from "./JobRecommendationsTab";
import { ApplicationUpdatesTab } from "./ApplicationUpdatesTab";
import { LearningPathsTab } from "./LearningPathsTab";
import { MessagesTab } from "./MessagesTab";

interface DashboardTabsProps {
  onViewApplication: (application: any) => void;
}

export const DashboardTabs = ({ onViewApplication }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="space-y-8">
      <TabsList className="grid w-full grid-cols-5 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 p-1">
        <TabsTrigger value="overview" className="rounded-lg font-medium">Overview</TabsTrigger>
        <TabsTrigger value="jobs" className="rounded-lg font-medium">Jobs</TabsTrigger>
        <TabsTrigger value="applications" className="rounded-lg font-medium">Applications</TabsTrigger>
        <TabsTrigger value="messages" className="rounded-lg font-medium">Messages</TabsTrigger>
        <TabsTrigger value="learning" className="rounded-lg font-medium">Learning</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-8">
        <OverviewTab />
      </TabsContent>

      <TabsContent value="jobs" className="space-y-8">
        <JobRecommendationsTab />
      </TabsContent>

      <TabsContent value="applications" className="space-y-8">
        <ApplicationUpdatesTab onViewApplication={onViewApplication} />
      </TabsContent>

      <TabsContent value="messages" className="space-y-8">
        <MessagesTab />
      </TabsContent>

      <TabsContent value="learning" className="space-y-8">
        <LearningPathsTab />
      </TabsContent>
    </Tabs>
  );
};
