
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Users, 
  FileText, 
  Eye, 
  Download,
  TrendingUp,
  TrendingDown,
  Activity
} from "lucide-react";

const AdminAnalytics = () => {
  // Mock data - in real app this would come from your analytics API
  const userGrowthData = [
    { month: "Jan", users: 1200, active: 980 },
    { month: "Feb", users: 1450, active: 1100 },
    { month: "Mar", users: 1680, active: 1250 },
    { month: "Apr", users: 2100, active: 1600 },
    { month: "May", users: 2400, active: 1900 },
    { month: "Jun", users: 2847, active: 2200 },
  ];

  const contentEngagementData = [
    { type: "Blog Posts", views: 15640, downloads: 0 },
    { type: "Career Guides", views: 12350, downloads: 2340 },
    { type: "Assessment Tools", views: 8920, downloads: 0 },
    { type: "Job Listings", views: 23450, downloads: 0 },
    { type: "Resources", views: 6780, downloads: 1890 },
  ];

  const userTypeDistribution = [
    { name: "Job Seekers", value: 65, color: "#3b82f6" },
    { name: "Employers", value: 25, color: "#10b981" },
    { name: "Admins", value: 10, color: "#f59e0b" },
  ];

  const keyMetrics = [
    {
      title: "Total Page Views",
      value: "127,459",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
    },
    {
      title: "User Registrations",
      value: "2,847",
      change: "+8.3%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Content Published",
      value: "156",
      change: "+15.2%",
      trend: "up",
      icon: FileText,
    },
    {
      title: "Resource Downloads",
      value: "4,230",
      change: "-2.1%",
      trend: "down",
      icon: Download,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className="flex items-center mt-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span
                      className={`text-sm ${
                        metric.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {metric.change}
                    </span>
                  </div>
                </div>
                <metric.icon className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="engagement">User Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Total Users"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="active" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Active Users"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userTypeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {userTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={contentEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#3b82f6" name="Views" />
                  <Bar dataKey="downloads" fill="#10b981" name="Downloads" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Session Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8m 32s</div>
                <p className="text-sm text-muted-foreground">Average time on site</p>
                <Badge variant="secondary" className="mt-2">
                  +5.2% from last month
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Bounce Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24.7%</div>
                <p className="text-sm text-muted-foreground">Single page sessions</p>
                <Badge variant="secondary" className="mt-2">
                  -3.1% from last month
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Return Visitors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">68.3%</div>
                <p className="text-sm text-muted-foreground">Users who returned</p>
                <Badge variant="secondary" className="mt-2">
                  +2.8% from last month
                </Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;
