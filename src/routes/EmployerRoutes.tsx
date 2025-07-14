
import { Route, Suspense } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PageLoader } from "./routeUtils";
import {
  EmployerDashboard,
  EmployerJobs,
  JobApplicants,
  AllApplicants,
  EmployerInterviews,
  InterviewSchedule
} from "./lazyImports";

export const EmployerRoutes = () => (
  <>
    <Route path="/employer/dashboard" element={
      <ProtectedRoute requiredRole="employer">
        <Suspense fallback={<PageLoader />}>
          <EmployerDashboard />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/employer/jobs" element={
      <ProtectedRoute requiredRole="employer">
        <Suspense fallback={<PageLoader />}>
          <EmployerJobs />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/employer/jobs/:id/applicants" element={
      <ProtectedRoute requiredRole="employer">
        <Suspense fallback={<PageLoader />}>
          <JobApplicants />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/employer/applicants" element={
      <ProtectedRoute requiredRole="employer">
        <Suspense fallback={<PageLoader />}>
          <AllApplicants />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/employer/interviews" element={
      <ProtectedRoute requiredRole="employer">
        <Suspense fallback={<PageLoader />}>
          <EmployerInterviews />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="/employer/interviews/schedule" element={
      <ProtectedRoute requiredRole="employer">
        <Suspense fallback={<PageLoader />}>
          <InterviewSchedule />
        </Suspense>
      </ProtectedRoute>
    } />
  </>
);
