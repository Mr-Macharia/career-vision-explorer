
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Suspense } from "react-redux";
import { ScrollToTop, PageLoader } from "./routeUtils";
import { PublicRoutes } from "./PublicRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { EmployerRoutes } from "./EmployerRoutes";
import { JobSeekerRoutes } from "./JobSeekerRoutes";
import { NotFound } from "./lazyImports";

const AppRoutesContent = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <PublicRoutes />
        
        {/* Admin Routes */}
        <AdminRoutes />

        {/* Employer Routes */}
        <EmployerRoutes />

        {/* Job Seeker Protected Routes */}
        <JobSeekerRoutes />

        {/* Catch-all route for 404 */}
        <Route path="*" element={
          <Suspense fallback={<PageLoader />}>
            <NotFound />
          </Suspense>
        } />
      </Routes>
    </>
  );
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AppRoutesContent />
    </BrowserRouter>
  );
};
