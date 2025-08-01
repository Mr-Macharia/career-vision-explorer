import { apiClient } from '../lib/api-client';
import { 
  User, 
  UserLogin, 
  UserRegister, 
  TokenResponse, 
  RefreshTokenRequest,
  PasswordChangeRequest,
  PasswordResetRequest,
  PasswordResetConfirm 
} from '../types/auth';
import { trackDbOperation } from '../utils/performance';

class AuthService {
  async register(userData: UserRegister): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>('/auth/register', userData);
    
    // Store tokens and user data
    if (response.access_token) {
      apiClient.setToken(response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      
      // Construct user object from flat response
      const user: User = {
        user_id: response.user_id,
        name: '', // Will be loaded from profile
        email: response.email,
        account_type: response.account_type as 'job_seeker' | 'employer' | 'admin' | 'freelancer'
      };
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return response;
  }

  async login(credentials: UserLogin): Promise<TokenResponse> {
    return trackDbOperation('User Login', async () => {
      const response = await apiClient.post<TokenResponse>('/auth/login', credentials);
      
      // Store tokens and user data
      if (response.access_token) {
        apiClient.setToken(response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        
        // Construct user object from flat response
        const user: User = {
          user_id: response.user_id,
          name: '', // Will be loaded from profile
          email: response.email,
          account_type: response.account_type as 'job_seeker' | 'employer' | 'admin' | 'freelancer'
        };
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      return response;
    });
  }

  async logout(): Promise<void> {
    // Clear all stored data
    apiClient.setToken(null);
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    localStorage.removeItem('visiondrillUser'); // Clear old mock data
    localStorage.removeItem('visiondrillImpersonation');
  }

  async refreshToken(): Promise<TokenResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const request: RefreshTokenRequest = { refresh_token: refreshToken };
    const response = await apiClient.post<TokenResponse>('/auth/refresh', request);
    
    // Update stored tokens
    if (response.access_token) {
      apiClient.setToken(response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      
      // Construct user object from token response
      const user: User = {
        user_id: response.user_id,
        name: '', // Will be loaded from profile
        email: response.email,
        account_type: response.account_type as 'job_seeker' | 'employer' | 'admin' | 'freelancer'
      };
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return response;
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<{ user_id: string; email: string; account_type: string }>('/auth/me');
    return {
      user_id: response.user_id,
      name: '', // Will be filled from profile
      email: response.email,
      account_type: response.account_type as 'job_seeker' | 'employer' | 'admin' | 'freelancer'
    };
  }

  async changePassword(passwordChange: PasswordChangeRequest): Promise<{ message: string }> {
    return await apiClient.post<{ message: string }>('/auth/change-password', passwordChange);
  }

  async resetPassword(resetRequest: PasswordResetRequest): Promise<{ message: string }> {
    return await apiClient.post<{ message: string }>('/auth/reset-password', resetRequest);
  }

  async confirmPasswordReset(confirmRequest: PasswordResetConfirm): Promise<{ message: string }> {
    return await apiClient.post<{ message: string }>('/auth/reset-password/confirm', confirmRequest);
  }

  async registerAdmin(userData: UserRegister): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>('/auth/register/admin', userData);
    
    if (response.access_token) {
      apiClient.setToken(response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  }

  async registerFirstAdmin(userData: UserRegister): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>('/auth/register/first-admin', userData);
    
    if (response.access_token) {
      apiClient.setToken(response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  }

  // Helper methods
  isAuthenticated(): boolean {
    const token = apiClient.getToken();
    const user = this.getStoredUser();
    return !!(token && user);
  }

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr && userStr !== 'undefined') {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    return null;
  }

  setStoredUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  hasRole(role: 'job_seeker' | 'employer' | 'admin' | 'freelancer'): boolean {
    const user = this.getStoredUser();
    return user?.account_type === role;
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  isEmployer(): boolean {
    return this.hasRole('employer');
  }

  isJobSeeker(): boolean {
    return this.hasRole('job_seeker');
  }

  isFreelancer(): boolean {
    return this.hasRole('freelancer');
  }
}

export const authService = new AuthService();