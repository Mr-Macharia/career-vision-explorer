
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Lightweight loading component
export const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
      <div className="w-4 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-4 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
  </div>
);

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
