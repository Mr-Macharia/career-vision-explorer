
import { Route, Suspense } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PageLoader } from "./routeUtils";
import {
  AdminLogin,
  AdminDashboard,
  AdminUsers,
  AdminFreelancers,
  AdminJobseekers,
  AdminProfiles,
  AdminJobs,
  AdminSkills,
  AdminCareerPaths,
  AdminPartners,
  AdminTestimonials,
  AdminContent,
  AdminInsights,
  AdminAPI,
  AdminSettings
} from "./lazyImports";

export const AdminRoutes = () => (
  <>
    <Route path="/admin/login" element={
      <Suspense fallback={<PageLoader />}>
        <AdminLogin />
      </Suspense>
    } />
    <Route path="/admin" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminDashboard />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/admin/dashboard" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminDashboard />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/admin/users" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminUsers />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/admin/freelancers" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminFreelancers />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/admin/jobseeker" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminJobseekers />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/admin/profiles" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminProfiles />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/admin/jobs" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminJobs />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/admin/skills" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminSkills />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/admin/career-paths" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminCareerPaths />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/admin/partners" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminPartners />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/admin/testimonials" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminTestimonials />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/admin/content" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminContent />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/admin/insights" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminInsights />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/admin/api" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminAPI />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/admin/settings" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminSettings />
        </Suspense>
      </ProtectedRoute>
    } />
  </>
);
