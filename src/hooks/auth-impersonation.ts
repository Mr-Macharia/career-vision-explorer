
import { Dispatch, SetStateAction } from 'react';
import { toast } from "@/components/ui/sonner";
import { AuthState, User } from './auth-types';

export const useImpersonation = (
  setAuthState: Dispatch<SetStateAction<AuthState>>,
  authState: AuthState
) => {
  const impersonateUser = (targetUser: User) => {
    if (!authState.user || (authState.user.role !== 'admin' && authState.user.role !== 'subadmin')) {
      toast.error("Access Denied", {
        description: "Only admins and subadmins can impersonate users",
      });
      return;
    }

    console.log('Starting impersonation:', { originalUser: authState.user, targetUser });
    
    const impersonationData = {
      originalUser: authState.user,
      impersonatedUser: targetUser
    };
    localStorage.setItem('visiondrillImpersonation', JSON.stringify(impersonationData));
    
    setAuthState(prev => ({
      ...prev,
      originalUser: authState.user,
      user: targetUser,
      isImpersonating: true,
    }));
    
    toast.success("Impersonation Started", {
      description: `Now viewing as ${targetUser.name}`,
    });
  };

  const stopImpersonation = () => {
    if (!authState.isImpersonating || !authState.originalUser) return;
    
    console.log('Stopping impersonation, returning to:', authState.originalUser);
    
    localStorage.removeItem('visiondrillImpersonation');
    
    setAuthState(prev => ({
      ...prev,
      user: authState.originalUser,
      originalUser: null,
      isImpersonating: false,
    }));
    
    toast.success("Impersonation Stopped", {
      description: `Returned to your original account`,
    });
  };

  return { impersonateUser, stopImpersonation };
};
