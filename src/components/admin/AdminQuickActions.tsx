
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useAdminAnalytics } from "@/hooks/use-admin-analytics";
import { toast } from "@/components/ui/sonner";
import { 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  ArrowRight,
  Lock,
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  route: string;
  permission: string[];
  color: string;
  bgColor: string;
  status: 'active' | 'maintenance' | 'disabled';
  badgeText?: string;
  badgeColor?: string;
}

export const AdminQuickActions = () => {
  const navigate = useNavigate();
  const { hasRole } = useAuth();
  const { trackAdminAction } = useAdminAnalytics();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const quickActions: QuickAction[] = [
    {
      id: 'manage-users',
      title: 'Manage Users',
      description: 'View, edit, and manage user accounts and permissions',
      icon: Users,
      route: '/admin/users',
      permission: ['admin', 'subadmin'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      status: 'active',
      badgeText: 'Updated',
      badgeColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'content-management',
      title: 'Content Management',
      description: 'Create, edit, and publish website content and pages',
      icon: FileText,
      route: '/admin/content',
      permission: ['admin', 'subadmin'],
      color: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100',
      status: 'active',
      badgeText: 'Enhanced',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'system-settings',
      title: 'System Settings',
      description: 'Configure site settings, integrations, and preferences',
      icon: Settings,
      route: '/admin/settings',
      permission: ['admin'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      status: 'active'
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'View reports, user insights, and performance metrics',
      icon: BarChart3,
      route: '/admin/insights',
      permission: ['admin', 'subadmin'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 hover:bg-orange-100',
      status: 'active',
      badgeText: 'Real-time',
      badgeColor: 'bg-orange-100 text-orange-800'
    }
  ];

  const handleQuickAction = async (action: QuickAction) => {
    // Check permissions
    const hasPermission = action.permission.some(role => hasRole(role));
    if (!hasPermission) {
      toast.error("Access Denied", {
        description: "You don't have permission to access this module",
      });
      return;
    }

    // Check if action is available
    if (action.status === 'disabled') {
      toast.error("Feature Unavailable", {
        description: "This feature is currently disabled",
      });
      return;
    }

    if (action.status === 'maintenance') {
      toast.error("Under Maintenance", {
        description: "This feature is temporarily unavailable for maintenance",
      });
      return;
    }

    // Track the action
    trackAdminAction('quick_action_clicked', {
      actionId: action.id,
      actionTitle: action.title,
      route: action.route
    });

    // Show loading state
    setLoadingAction(action.id);

    try {
      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate to the route
      navigate(action.route);
      
      toast.success("Navigation Successful", {
        description: `Opening ${action.title}...`,
        duration: 2000,
      });
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error("Navigation Failed", {
        description: "Unable to navigate to the requested module",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'maintenance':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'disabled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getPermissionText = (permissions: string[]) => {
    if (permissions.includes('admin') && permissions.includes('subadmin')) {
      return 'Admin & Sub-admin access';
    }
    if (permissions.includes('admin')) {
      return 'Admin only';
    }
    return 'Limited access';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Quick Actions
          <div className="flex items-center gap-2">
            {getStatusIcon('active')}
            <span className="text-sm text-gray-500">All systems operational</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            const hasPermission = action.permission.some(role => hasRole(role));
            const isLoading = loadingAction === action.id;
            
            return (
              <div
                key={action.id}
                className={`relative p-6 rounded-lg border transition-all duration-200 cursor-pointer transform hover:scale-[1.02] hover:shadow-lg ${
                  hasPermission 
                    ? action.bgColor 
                    : 'bg-gray-50 hover:bg-gray-100 opacity-60'
                } ${isLoading ? 'pointer-events-none' : ''}`}
                onClick={() => hasPermission && !isLoading && handleQuickAction(action)}
              >
                {/* Loading Overlay */}
                {isLoading && (
                  <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center z-10">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                  </div>
                )}

                {/* Status Badge */}
                {action.badgeText && hasPermission && (
                  <Badge className={`absolute top-3 right-3 text-xs ${action.badgeColor}`}>
                    {action.badgeText}
                  </Badge>
                )}

                {/* Permission Lock */}
                {!hasPermission && (
                  <div className="absolute top-3 right-3">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                )}

                <div className="space-y-3">
                  {/* Icon and Title */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${hasPermission ? action.color : 'text-gray-400'} bg-white/50`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${hasPermission ? 'text-gray-900' : 'text-gray-500'}`}>
                          {action.title}
                        </h3>
                        {getStatusIcon(action.status)}
                      </div>
                    </div>
                    {hasPermission && action.status === 'active' && (
                      <ArrowRight className={`h-5 w-5 ${action.color} transform transition-transform group-hover:translate-x-1`} />
                    )}
                  </div>

                  {/* Description */}
                  <p className={`text-sm ${hasPermission ? 'text-gray-600' : 'text-gray-400'}`}>
                    {action.description}
                  </p>

                  {/* Permission and Status Info */}
                  <div className="flex items-center justify-between text-xs">
                    <span className={hasPermission ? 'text-gray-500' : 'text-red-500'}>
                      {hasPermission ? getPermissionText(action.permission) : 'Access restricted'}
                    </span>
                    <span className={`capitalize ${
                      action.status === 'active' ? 'text-green-600' :
                      action.status === 'maintenance' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {action.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Quick Actions:</strong> Click on any available module to navigate directly to that section. 
            Your access level determines which modules you can access. If you need additional permissions, 
            contact your system administrator.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
