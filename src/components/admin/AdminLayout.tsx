import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Home, Bell, Settings, LayoutDashboard, Users, UserCheck, User, Briefcase, Award, TrendingUp, Handshake, MessageSquare, FileText, BarChart3, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { Sidebar } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, logout } = useAuth();

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
      end: true
    },
    {
      title: "Users",
      icon: Users,
      href: "/admin/users"
    },
    {
      title: "Job Seekers",
      icon: UserCheck,
      href: "/admin/jobseeker"
    },
    {
      title: "Freelancers",
      icon: Users,
      href: "/admin/freelancers"
    },
    {
      title: "Profiles",
      icon: User,
      href: "/admin/profiles"
    },
    {
      title: "Jobs",
      icon: Briefcase,
      href: "/admin/jobs"
    },
    {
      title: "Skills",
      icon: Award,
      href: "/admin/skills"
    },
    {
      title: "Career Paths",
      icon: TrendingUp,
      href: "/admin/career-paths"
    },
    {
      title: "Partners",
      icon: Handshake,
      href: "/admin/partners"
    },
    {
      title: "Testimonials",
      icon: MessageSquare,
      href: "/admin/testimonials"
    },
    {
      title: "Content",
      icon: FileText,
      href: "/admin/content"
    },
    {
      title: "Insights",
      icon: BarChart3,
      href: "/admin/insights"
    },
    {
      title: "API",
      icon: Code,
      href: "/admin/api"
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/admin/settings"
    }
  ];

  if (!isAuthenticated) {
    navigate("/admin/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar className="w-64 border-r flex-col space-y-2">
        <div className="h-16 flex items-center justify-center">
          <Link to="/" className="text-xl font-bold">
            Vision Drill
          </Link>
        </div>
        <div className="flex-1 space-y-1">
          {sidebarItems.map((item) => (
            <Sidebar.Item
              key={item.title}
              title={item.title}
              icon={item.icon}
              href={item.href}
              active={item.href === window.location.pathname}
            />
          ))}
        </div>
        <div className="p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start font-normal"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </Sidebar>

      <div className="ml-64">
        <nav className="bg-card border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {title}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, <span className="font-medium text-foreground">{user?.name}</span>
                </span>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-2">
            <AdminBreadcrumb />
            <div className="bg-card rounded-lg shadow-sm border p-6 mt-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
