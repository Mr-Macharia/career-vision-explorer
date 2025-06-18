
import { Dispatch, SetStateAction } from 'react';
import { authenticateUser, createUser, logoutUser } from '@/lib/auth';
import { toast } from "@/components/ui/sonner";
import { AuthState, UserRole } from './auth-types';

export const useAuthActions = (setAuthState: Dispatch<SetStateAction<AuthState>>) => {
  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    console.log('Login attempt:', email);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const authenticatedUser = authenticateUser(email, password);
    console.log('Authentication result:', authenticatedUser);
    
    if (authenticatedUser) {
      setAuthState(prev => ({
        ...prev,
        user: authenticatedUser,
        isAuthenticated: true,
        isLoading: false,
      }));
      return true;
    }
    
    setAuthState(prev => ({ ...prev, isLoading: false }));
    return false;
  };

  const signup = async (userData: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phoneNumber?: string;
    countryCode?: string;
    profileImage?: string;
  }): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    console.log('Signup attempt:', userData.email);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser = createUser(userData);
      console.log('User creation result:', newUser);
      
      if (newUser) {
        setAuthState(prev => ({
          ...prev,
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        }));
        return true;
      }
      
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    logoutUser();
    setAuthState({
      user: null,
      originalUser: null,
      isAuthenticated: false,
      isLoading: false,
      isImpersonating: false,
    });
    toast.success("Logged out successfully");
  };

  return { login, signup, logout };
};
