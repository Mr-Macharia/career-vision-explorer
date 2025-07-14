
import { Route, Suspense } from "react";
import { Route as RouterRoute } from "react-router-dom";
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
    <RouterRoute path="/admin/login" element={
      <Suspense fallback={<PageLoader />}>
        <AdminLogin />
      </Suspense>
    } />
    <RouterRoute path="/admin" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminDashboard />
        </Suspense>
      </ProtectedRoute>
    } />
    <RouterRoute path="/admin/dashboard" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminDashboard />
        </Suspense>
      </ProtectedRoute>
    } />
    <RouterRoute path="/admin/users" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminUsers />
        </Suspense>
      </ProtectedRoute>
    } />
    <RouterRoute path="/admin/freelancers" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminFreelancers />
        </Suspense>
      </ProtectedRoute>
    } />
    <RouterRoute path="/admin/jobseeker" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminJobseekers />
        </Suspense>
      </ProtectedRoute>
    } />
    <RouterRoute path="/admin/profiles" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminProfiles />
        </Suspense>
      </ProtectedRoute>
    } />
    <RouterRoute path="/admin/jobs" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminJobs />
        </Suspense>
      </ProtectedRoute>
    } />
    <RouterRoute path="/admin/skills" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminSkills />
        </Suspense>
      </ProtectedRoute>
    } />
    <RouterRoute path="/admin/career-paths" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminCareerPaths />
        </Suspense>
      </ProtectedRoute>
    } />
    <RouterRoute path="/admin/partners" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminPartners />
        </Suspense>
      </ProtectedRoute>
    } />
    <RouterRoute path="/admin/testimonials" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminTestimonials />
        </Suspense>
      </ProtectedRoute>
    } />
    <RouterRoute path="/admin/content" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminContent />
        </Suspense>
      </ProtectedRoute>
    } />
    <RouterRoute path="/admin/insights" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminInsights />
        </Suspense>
      </ProtectedRoute>
    } />
    <RouterRoute path="/admin/api" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminAPI />
        </Suspense>
      </ProtectedRoute>
    } />
    <RouterRoute path="/admin/settings" element={
      <ProtectedRoute requiredRole="admin">
        <Suspense fallback={<PageLoader />}>
          <AdminSettings />
        </Suspense>
      </ProtectedRoute>
    } />
  </>
);
