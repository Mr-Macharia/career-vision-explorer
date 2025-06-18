
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { toast } from "@/components/ui/sonner";
import { AuthState, AuthContextType } from './auth-types';
import { useAuthActions } from './auth-actions';
import { useImpersonation } from './auth-impersonation';
import { getCurrentUser } from '@/lib/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    originalUser: null,
    isAuthenticated: false,
    isLoading: true,
    isImpersonating: false,
  });

  const authActions = useAuthActions(setAuthState);
  const impersonationActions = useImpersonation(setAuthState, authState);

  useEffect(() => {
    // Check for existing user on mount
    const initializeAuth = () => {
      console.log('Initializing auth state...');
      
      try {
        const currentUser = getCurrentUser();
        console.log('Current user from storage:', currentUser);
        
        if (currentUser) {
          setAuthState(prev => ({
            ...prev,
            user: currentUser,
            isAuthenticated: true,
          }));
          
          // Check if there's an impersonation session
          const impersonationData = localStorage.getItem('visiondrillImpersonation');
          if (impersonationData) {
            try {
              const { originalUser: storedOriginalUser, impersonatedUser } = JSON.parse(impersonationData);
              setAuthState(prev => ({
                ...prev,
                originalUser: storedOriginalUser,
                user: impersonatedUser,
                isImpersonating: true,
              }));
              console.log('Restored impersonation session:', { originalUser: storedOriginalUser, impersonatedUser });
            } catch (e) {
              console.error('Error parsing impersonation data:', e);
              localStorage.removeItem('visiondrillImpersonation');
            }
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  const hasRole = (role: string): boolean => {
    return authState.user !== null && authState.user.role === role;
  };

  const contextValue: AuthContextType = {
    ...authState,
    ...authActions,
    ...impersonationActions,
    hasRole,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
