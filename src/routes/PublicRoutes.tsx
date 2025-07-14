
import { Route, Suspense } from "react-router-dom";
import { PageLoader } from "./routeUtils";
import {
  Index,
  Login,
  Signup,
  PublicProfile,
  Jobs,
  JobDetails,
  About,
  Blog,
  Help,
  Contact,
  FAQ,
  Privacy,
  Terms,
  FreelancerProfile
} from "./lazyImports";

export const PublicRoutes = () => (
  <>
    <Route path="/" element={
      <Suspense fallback={<PageLoader />}>
        <Index />
      </Suspense>
    } />
    <Route path="/login" element={
      <Suspense fallback={<PageLoader />}>
        <Login />
      </Suspense>
    } />
    <Route path="/signup" element={
      <Suspense fallback={<PageLoader />}>
        <Signup />
      </Suspense>
    } />
    <Route path="/profile/:id" element={
      <Suspense fallback={<PageLoader />}>
        <PublicProfile />
      </Suspense>
    } />
    <Route path="/jobs" element={
      <Suspense fallback={<PageLoader />}>
        <Jobs />
      </Suspense>
    } />
    <Route path="/jobs/:id" element={
      <Suspense fallback={<PageLoader />}>
        <JobDetails />
      </Suspense>
    } />
    <Route path="/about" element={
      <Suspense fallback={<PageLoader />}>
        <About />
      </Suspense>
    } />
    <Route path="/blog" element={
      <Suspense fallback={<PageLoader />}>
        <Blog />
      </Suspense>
    } />
    <Route path="/help" element={
      <Suspense fallback={<PageLoader />}>
        <Help />
      </Suspense>
    } />
    <Route path="/contact" element={
      <Suspense fallback={<PageLoader />}>
        <Contact />
      </Suspense>
    } />
    <Route path="/faq" element={
      <Suspense fallback={<PageLoader />}>
        <FAQ />
      </Suspense>
    } />
    <Route path="/privacy" element={
      <Suspense fallback={<PageLoader />}>
        <Privacy />
      </Suspense>
    } />
    <Route path="/terms" element={
      <Suspense fallback={<PageLoader />}>
        <Terms />
      </Suspense>
    } />
    <Route path="/freelancer/:id" element={
      <Suspense fallback={<PageLoader />}>
        <FreelancerProfile />
      </Suspense>
    } />
  </>
);
