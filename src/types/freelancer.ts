
export interface FreelancerProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  title: string;
  description: string;
  skills: string[];
  profileImage?: string;
  rating: number;
  completedProjects: number;
  isActive: boolean;
  joinDate: string;
  portfolio: PortfolioItem[];
  pricing: PricingTier[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  createdAt: string;
}

export interface PricingTier {
  id: string;
  tier: 'basic' | 'standard' | 'premium';
  title: string;
  price: number;
  description: string;
  deliveryDays: number;
  revisions: number;
  features: string[];
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  tier?: string;
  timestamp: string;
  isRead: boolean;
}
