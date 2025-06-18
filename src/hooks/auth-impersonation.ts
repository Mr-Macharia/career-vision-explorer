
import { Dispatch, SetStateAction } from 'react';
import { toast } from "@/components/ui/sonner";
import { AuthState, User } from './auth-types';

export const useImpersonation = (
  setAuthState: Dispatch<SetStateAction<AuthState>>, 
  authState: AuthState
) => {
  const impersonateUser = (user: User) => {
    console.log('Starting impersonation:', user);
    
    // Store the original user if not already impersonating
    const originalUser = authState.isImpersonating ? authState.originalUser : authState.user;
    
    // Update auth state
    setAuthState(prev => ({
      ...prev,
      originalUser,
      user,
      isImpersonating: true,
    }));
    
    // Store impersonation data in localStorage
    localStorage.setItem('visiondrillImpersonation', JSON.stringify({
      originalUser,
      impersonatedUser: user,
    }));
    
    toast.success("Impersonation Started", {
      description: `Now viewing as ${user.name}`,
    });
  };

  const stopImpersonation = () => {
    console.log('Stopping impersonation');
    
    if (!authState.isImpersonating || !authState.originalUser) {
      toast.error("No active impersonation session");
      return;
    }
    
    // Restore original user
    setAuthState(prev => ({
      ...prev,
      user: prev.originalUser,
      originalUser: null,
      isImpersonating: false,
    }));
    
    // Clear impersonation data
    localStorage.removeItem('visiondrillImpersonation');
    
    toast.success("Impersonation Stopped", {
      description: `Returned to ${authState.originalUser.name}`,
    });
  };

  return { impersonateUser, stopImpersonation };
};
