
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authenticateUser, logoutUser, getCurrentUser, createUser } from '@/lib/auth';
import { toast } from "@/components/ui/sonner";
import { AuthState, AuthContextType } from './auth-types';
import { useAuthActions } from './auth-actions';
import { useImpersonation } from './auth-impersonation';

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
    const currentUser = getCurrentUser();
    console.log('Checking existing user:', currentUser);
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
          localStorage.removeItem('visiondrillImpersonation');
        }
      }
    }
    setAuthState(prev => ({ ...prev, isLoading: false }));
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
