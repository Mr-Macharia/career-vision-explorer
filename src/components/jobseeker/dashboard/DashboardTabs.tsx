
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobRecommendationsTab } from "./JobRecommendationsTab";
import { MessagesTab } from "./MessagesTab";
import { UpcomingInterviewsTab } from "./UpcomingInterviewsTab";
import { ApplicationUpdatesTab } from "./ApplicationUpdatesTab";
import { LearningPathsTab } from "./LearningPathsTab";

interface DashboardTabsProps {
  onViewApplication: (application: any) => void;
}

export const DashboardTabs = ({ onViewApplication }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="jobs" className="space-y-8">
      <TabsList className="grid w-full grid-cols-5 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 p-1">
        <TabsTrigger value="jobs" className="rounded-lg font-medium">Jobs</TabsTrigger>
        <TabsTrigger value="messages" className="rounded-lg font-medium">Messages</TabsTrigger>
        <TabsTrigger value="interviews" className="rounded-lg font-medium">Upcoming Interviews</TabsTrigger>
        <TabsTrigger value="applications" className="rounded-lg font-medium">Applications</TabsTrigger>
        <TabsTrigger value="learning" className="rounded-lg font-medium">Learning</TabsTrigger>
      </TabsList>

      <TabsContent value="jobs" className="space-y-8">
        <JobRecommendationsTab />
      </TabsContent>

      <TabsContent value="messages" className="space-y-8">
        <MessagesTab />
      </TabsContent>

      <TabsContent value="interviews" className="space-y-8">
        <UpcomingInterviewsTab />
      </TabsContent>

      <TabsContent value="applications" className="space-y-8">
        <ApplicationUpdatesTab onViewApplication={onViewApplication} />
      </TabsContent>

      <TabsContent value="learning" className="space-y-8">
        <LearningPathsTab />
      </TabsContent>
    </Tabs>
  );
};
