
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Search, 
  FileText, 
  BookOpen, 
  Users, 
  ArrowRight, 
  Plus,
  Eye,
  Edit
} from "lucide-react";

export const QuickActionsCard = () => {
  const quickActions = [
    {
      icon: Search,
      title: "Find New Jobs",
      description: "Browse AI-matched opportunities",
      action: "Search Jobs",
      link: "/jobs",
      variant: "default" as const,
      priority: "high",
    },
    {
      icon: FileText,
      title: "Update Resume",
      description: "Keep your profile current",
      action: "Edit Profile",
      link: "/profile",
      variant: "outline" as const,
      priority: "medium",
    },
    {
      icon: BookOpen,
      title: "Skill Assessment",
      description: "Boost your credibility",
      action: "Take Assessment",
      link: "/profile?tab=assessments",
      variant: "outline" as const,
      priority: "medium",
    },
    {
      icon: Users,
      title: "Network Events",
      description: "Connect with industry professionals",
      action: "View Events",
      link: "/partners",
      variant: "outline" as const,
      priority: "low",
    },
  ];

  const recentActivities = [
    {
      action: "Applied to",
      company: "TechCorp Inc.",
      role: "Senior Developer",
      time: "2 hours ago",
      status: "pending",
    },
    {
      action: "Viewed",
      company: "Startup Labs",
      role: "Frontend Engineer",
      time: "1 day ago",
      status: "saved",
    },
    {
      action: "Assessment completed",
      company: "React Skills",
      role: "Score: 94%",
      time: "3 days ago",
      status: "completed",
    },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Quick Actions */}
      <Card className="lg:col-span-2 bg-gradient-to-br from-white to-blue-50/30 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Take these actions to boost your job search success
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={index}
                  className="group p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-200 bg-white/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{action.title}</h3>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                    {action.priority === 'high' && (
                      <Badge className="bg-red-100 text-red-700 text-xs">Priority</Badge>
                    )}
                  </div>
                  
                  <Button
                    variant={action.variant}
                    size="sm"
                    className="w-full group-hover:shadow-sm"
                    asChild
                  >
                    <Link to={action.link} className="flex items-center justify-center space-x-2">
                      <span>{action.action}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Your latest job search activities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.status === 'pending' ? 'bg-yellow-500' :
                activity.status === 'saved' ? 'bg-blue-500' :
                'bg-green-500'
              }`}></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="text-muted-foreground">{activity.action}</span>{' '}
                  <span className="font-medium">{activity.company}</span>
                </p>
                <p className="text-xs text-muted-foreground truncate">{activity.role}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
          
          <Button variant="ghost" size="sm" className="w-full mt-4" asChild>
            <Link to="/profile" className="flex items-center justify-center space-x-2">
              <span>View All Activity</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
