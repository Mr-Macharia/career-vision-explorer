
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminQuickActions } from "./AdminQuickActions";
import { useAuth } from "@/hooks/use-auth";
import { useAdminAnalytics } from "@/hooks/use-admin-analytics";
import { useState, useEffect } from "react";
import { 
  Users, 
  Briefcase, 
  FileText, 
  BarChart3, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export default function AdminOverview() {
  const { user } = useAuth();
  const { getAnalytics } = useAdminAnalytics();
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalContent: 0,
    totalEvents: 0,
    recentActivity: 0
  });

  useEffect(() => {
    // Load system statistics
    const analytics = getAnalytics();
    const mockStats = {
      totalUsers: 1247,
      totalJobs: 89,
      totalContent: 156,
      totalEvents: analytics.length,
      recentActivity: analytics.filter(event => 
        new Date(event.timestamp).getTime() > Date.now() - 24 * 60 * 60 * 1000
      ).length
    };
    setSystemStats(mockStats);
  }, [getAnalytics]);

  const systemStatus = {
    overall: 'operational',
    database: 'operational', 
    api: 'operational',
    storage: 'operational'
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-blue-100">
          Here's what's happening with your platform today.
        </p>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">Database</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-700">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">API Services</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-700">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">File Storage</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-700">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">Real-time Sync</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-700">Operational</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-blue-600">{systemStats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% this month
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-3xl font-bold text-green-600">{systemStats.totalJobs}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +8% this week
                </p>
              </div>
              <Briefcase className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Content Items</p>
                <p className="text-3xl font-bold text-purple-600">{systemStats.totalContent}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +15% this month
                </p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recent Activity</p>
                <p className="text-3xl font-bold text-orange-600">{systemStats.recentActivity}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  Last 24 hours
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Component */}
      <AdminQuickActions />

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Admin Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getAnalytics().slice(-5).reverse().map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">{event.action}</p>
                    <p className="text-xs text-gray-500">
                      {event.category} • {new Date(event.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {event.userId || 'System'}
                </span>
              </div>
            ))}
            {getAnalytics().length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No recent activity to display</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
