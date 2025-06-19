import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminLayout from "./components/admin/AdminLayout";
import AdminSettings from "./pages/admin/AdminSettings";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import EmployerJobs from "./pages/employer/EmployerJobs";
import EmployerSettings from "./pages/employer/EmployerSettings";
import EmployerInterviews from "./pages/employer/EmployerInterviews";
import CareerPaths from "./pages/CareerPaths";
import CareerPathDetail from "./pages/CareerPathDetail";
import JobDetail from "./pages/JobDetail";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import { ContentManagement } from "@/pages/admin/ContentManagement";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/career-paths" element={<CareerPaths />} />
      <Route path="/career-paths/:careerPathId" element={<CareerPathDetail />} />
      <Route path="/jobs/:jobId" element={<JobDetail />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute role="admin">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="jobs" element={<AdminJobs />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="content" element={<ContentManagement />} />
      </Route>

      {/* Employer Routes */}
      <Route path="/employer/dashboard" element={
        <ProtectedRoute role="employer">
          <EmployerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/employer/jobs" element={
        <ProtectedRoute role="employer">
          <EmployerJobs />
        </ProtectedRoute>
      } />
      <Route path="/employer/settings" element={
        <ProtectedRoute role="employer">
          <EmployerSettings />
        </ProtectedRoute>
      } />
      <Route path="/employer/interviews" element={
        <ProtectedRoute role="employer">
          <EmployerInterviews />
        </ProtectedRoute>
      } />
    </Route>
  )
);

const AppRoutes = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default AppRoutes;
