
import AdminLayout from "@/components/admin/AdminLayout";
import { EnhancedUserManagement } from "@/components/admin/users/EnhancedUserManagement";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/components/ui/sonner";

const AdminUsers = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, hasRole, isLoading } = useAuth();

  useEffect(() => {
    console.log("AdminUsers - Auth state:", { user, isAuthenticated, hasRole: hasRole("admin"), isLoading });
    
    if (!isLoading) {
      if (!isAuthenticated) {
        toast.error("Access Denied", {
          description: "Please log in to access the admin dashboard",
        });
        navigate("/admin/login");
        return;
      }

      if (!hasRole("admin") && !hasRole("subadmin")) {
        toast.error("Access Denied", {
          description: "You don't have permission to access the admin dashboard",
        });
        navigate("/");
        return;
      }
    }
  }, [isAuthenticated, hasRole, navigate, user, isLoading]);

  // Show loading while auth is being checked
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render if not authenticated or authorized
  if (!isAuthenticated || (!hasRole("admin") && !hasRole("subadmin"))) {
    return null;
  }

  return (
    <AdminLayout>
      <EnhancedUserManagement />
    </AdminLayout>
  );
};

export default AdminUsers;
