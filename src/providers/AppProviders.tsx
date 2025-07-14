
import { AuthProvider } from "@/hooks/use-auth";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FreelancersProvider } from "@/hooks/use-freelancers";
import { MessagingProvider } from "@/hooks/use-messaging";
import { UserProfileProvider } from "@/hooks/use-user-profile";
import { LearningPathsProvider } from "@/hooks/use-learning-paths";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="visiondrillTheme">
        <AuthProvider>
          <UserProfileProvider>
            <LearningPathsProvider>
              <FreelancersProvider>
                <MessagingProvider>
                  {children}
                  <Toaster />
                  <Sonner />
                </MessagingProvider>
              </FreelancersProvider>
            </LearningPathsProvider>
          </UserProfileProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
