
export type UserRole = 'admin' | 'jobseeker' | 'employer' | 'subadmin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  originalUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isImpersonating: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phoneNumber?: string;
    countryCode?: string;
    profileImage?: string;
  }) => Promise<boolean>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
  impersonateUser: (user: User) => void;
  stopImpersonation: () => void;
}
