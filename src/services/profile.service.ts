import { apiClient } from '../lib/api-client';
import { Profile, ProfileUpdate } from '../types/api';

// Mock data for when backend is unavailable
const mockProfile: Profile = {
  user_id: 'demo-user-123',
  name: 'Demo User',
  email: 'demo@example.com',
  phone: '+1234567890',
  location: 'Demo City, Demo State',
  skills: ['JavaScript', 'React', 'Node.js', 'Python'],
  experience_level: 'intermediate',
  account_type: 'job_seeker',
  bio: 'This is a demo profile. Connect to the backend to see real data.',
  linkedin_url: '',
  github_url: '',
  portfolio_url: '',
  resume_url: '',
  profile_image_url: '',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  is_active: true,
  preferences: {
    job_types: ['full-time'],
    remote_work: true,
    salary_range: { min: 50000, max: 100000 },
    preferred_locations: ['Remote']
  }
};

class ProfileService {
  async getProfile(): Promise<Profile> {
    try {
      return await apiClient.get<Profile>('/profile');
    } catch (error) {
      if (error instanceof Error && error.message === 'BACKEND_UNAVAILABLE') {
        console.warn('Backend unavailable, returning mock profile data');
        return mockProfile;
      }
      throw error;
    }
  }

  async updateProfile(profileData: ProfileUpdate): Promise<Profile> {
    try {
      return await apiClient.put<Profile>('/profile', profileData);
    } catch (error) {
      if (error instanceof Error && error.message === 'BACKEND_UNAVAILABLE') {
        console.warn('Backend unavailable, returning mock updated profile');
        return { ...mockProfile, ...profileData };
      }
      throw error;
    }
  }

  async getPublicProfile(userId: string): Promise<{
    user_id: string;
    name: string;
    skills: string[];
    account_type: string;
    created_at: string;
  }> {
    try {
      return await apiClient.get(`/profile/${userId}`);
    } catch (error) {
      if (error instanceof Error && error.message === 'BACKEND_UNAVAILABLE') {
        return {
          user_id: userId,
          name: 'Demo User',
          skills: ['JavaScript', 'React'],
          account_type: 'job_seeker',
          created_at: new Date().toISOString()
        };
      }
      throw error;
    }
  }

  // Get profile statistics
  async getProfileStats(): Promise<{
    total_applications: number;
    total_jobs_posted: number;
    profile_completeness: number;
    recommendations_count: number;
  }> {
    try {
      return await apiClient.get('/profile/stats');
    } catch (error) {
      if (error instanceof Error && error.message === 'BACKEND_UNAVAILABLE') {
        return {
          total_applications: 5,
          total_jobs_posted: 0,
          profile_completeness: 75,
          recommendations_count: 3
        };
      }
      throw error;
    }
  }

  // Skills management
  async addSkill(skill: string): Promise<{ message: string }> {
    try {
      return await apiClient.post(`/profile/skills`, { skill });
    } catch (error) {
      if (error instanceof Error && error.message === 'BACKEND_UNAVAILABLE') {
        return { message: 'Skill added successfully (demo mode)' };
      }
      throw error;
    }
  }

  async removeSkill(skill: string): Promise<{ message: string }> {
    try {
      return await apiClient.delete(`/profile/skills/${encodeURIComponent(skill)}`);
    } catch (error) {
      if (error instanceof Error && error.message === 'BACKEND_UNAVAILABLE') {
        return { message: 'Skill removed successfully (demo mode)' };
      }
      throw error;
    }
  }

  async updateSkills(skills: string[]): Promise<{ message: string }> {
    try {
      return await apiClient.put('/profile/skills', { skills });
    } catch (error) {
      if (error instanceof Error && error.message === 'BACKEND_UNAVAILABLE') {
        return { message: 'Skills updated successfully (demo mode)' };
      }
      throw error;
    }
  }

  // Search profiles with filters
  async searchProfiles(params: {
    skills?: string[];
    account_type?: 'job_seeker' | 'employer' | 'admin';
    limit?: number;
    offset?: number;
  }): Promise<Profile[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.skills) {
        params.skills.forEach(skill => queryParams.append('skills', skill));
      }
      if (params.account_type) {
        queryParams.append('account_type', params.account_type);
      }
      if (params.limit) {
        queryParams.append('limit', params.limit.toString());
      }
      if (params.offset) {
        queryParams.append('offset', params.offset.toString());
      }
      
      const queryString = queryParams.toString();
      const endpoint = queryString ? `/profile/search/profiles?${queryString}` : '/profile/search/profiles';
      
      return await apiClient.get<Profile[]>(endpoint);
    } catch (error) {
      if (error instanceof Error && error.message === 'BACKEND_UNAVAILABLE') {
        return [mockProfile];
      }
      throw error;
    }
  }

  async uploadAndParseCv(file: File): Promise<any> {
    try {
      const response = await apiClient.uploadFile<any>('/ai/upload-and-parse-cv', file);
      return response.data;
    } catch (error) {
      if (error instanceof Error && error.message === 'BACKEND_UNAVAILABLE') {
        return {
          message: 'CV parsing not available in demo mode',
          extracted_skills: ['JavaScript', 'React', 'Node.js']
        };
      }
      throw error;
    }
  }

  async parseResume(file: File): Promise<{
    updated_profile: Profile;
    parsed_data: any;
    cv_file_url: string;
  }> {
    try {
      const response = await apiClient.uploadFile<any>('/ai/upload-and-parse-cv', file);
      return response;
    } catch (error) {
      if (error instanceof Error && error.message === 'BACKEND_UNAVAILABLE') {
        return {
          updated_profile: mockProfile,
          parsed_data: {
            skills: ['JavaScript', 'React', 'Node.js'],
            experience: 'Demo experience data'
          },
          cv_file_url: 'demo-cv-url'
        };
      }
      throw error;
    }
  }
}

export const profileService = new ProfileService();