
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

const AdminAnalyticsPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, hasRole } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Access Denied", {
        description: "Please log in to access the admin dashboard",
      });
      navigate("/admin/login");
      return;
    }

    if (!hasRole("admin")) {
      toast.error("Access Denied", {
        description: "You don't have permission to access the admin dashboard",
      });
      navigate("/");
      return;
    }
  }, [isAuthenticated, hasRole, navigate, user]);

  if (!isAuthenticated || !hasRole("admin")) {
    return null;
  }

  return (
    <AdminLayout>
      <AdminAnalytics />
    </AdminLayout>
  );
};

export default AdminAnalyticsPage;
