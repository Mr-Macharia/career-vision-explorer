
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminOverview = () => {
  const navigate = useNavigate();

  const quickStats = [
    { label: "Total Users", value: "2,847", icon: Users, color: "text-blue-600" },
    { label: "Content Items", value: "156", icon: FileText, color: "text-green-600" },
    { label: "System Health", value: "98.5%", icon: CheckCircle, color: "text-emerald-600" },
    { label: "Active Sessions", value: "324", icon: TrendingUp, color: "text-purple-600" },
  ];

  const recentActivity = [
    { action: "User John Doe registered", time: "2 minutes ago", type: "user" },
    { action: "Homepage content updated", time: "15 minutes ago", type: "content" },
    { action: "New job posting created", time: "1 hour ago", type: "job" },
    { action: "System backup completed", time: "2 hours ago", type: "system" },
  ];

  const systemAlerts = [
    { message: "Database backup scheduled for tonight", type: "info" },
    { message: "3 users pending approval", type: "warning" },
  ];

  const quickActions = [
    { label: "Manage Users", path: "/admin/users", icon: Users },
    { label: "Content Management", path: "/admin/content", icon: FileText },
    { label: "System Settings", path: "/admin/settings", icon: Settings },
    { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Overview</h1>
        <Badge variant="secondary" className="text-sm">
          System Status: Healthy
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate(action.path)}
              >
                <action.icon className="h-4 w-4 mr-2" />
                {action.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-foreground">{activity.action}</p>
                    <p className="text-muted-foreground text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      {systemAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {systemAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    alert.type === "warning"
                      ? "bg-amber-50 text-amber-800 border border-amber-200"
                      : "bg-blue-50 text-blue-800 border border-blue-200"
                  }`}
                >
                  {alert.message}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminOverview;
