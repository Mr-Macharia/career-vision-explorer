import { Route, Suspense } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PageLoader } from "./routeUtils";
import {
  JobSeekerDashboard,
  JobSeekerSettings,
  Profile,
  Skills,
  CareerPaths,
  LearningPaths,
  Partners,
  Insights,
  FreelancerDashboard
} from "./lazyImports";

export const JobSeekerRoutes = () => (
  <>
    <Route path="/jobseeker/dashboard" element={
      <ProtectedRoute requiredRole="jobseeker">
        <Suspense fallback={<PageLoader />}>
          <JobSeekerDashboard />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/jobseeker/settings" element={
      <ProtectedRoute requiredRole="jobseeker">
        <Suspense fallback={<PageLoader />}>
          <JobSeekerSettings />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/profile" element={
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <Profile />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/skills" element={
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <Skills />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/career-paths" element={
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <CareerPaths />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/learning-paths" element={
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <LearningPaths />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/partners" element={
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <Partners />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/insights" element={
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <Insights />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/freelancer/dashboard" element={
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <FreelancerDashboard />
        </Suspense>
      </ProtectedRoute>
    } />
  </>
);
