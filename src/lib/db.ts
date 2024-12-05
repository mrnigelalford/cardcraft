import { kv } from '@vercel/kv';

export type User = {
  id: string;
  email: string;
  name?: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  stripeCustomerId?: string;
  subscriptionStatus: 'TRIAL' | 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
  subscriptionEndDate?: string;
};

export type BusinessCard = {
  id: string;
  userId: string;
  username: string;
  photo?: string;
  title?: string;
  bio?: string;
  resume?: string;
  theme?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
};

export type Contact = {
  id: string;
  businessCardId: string;
  type: string;
  value: string;
  icon?: string;
  createdAt: string;
};

export type SocialLink = {
  id: string;
  businessCardId: string;
  platform: string;
  url: string;
  icon?: string;
  createdAt: string;
};

// Helper functions
export const db = {
  async getUser(id: string): Promise<User | null> {
    return kv.hgetall(`user:${id}`);
  },

  async getUserByEmail(email: string): Promise<User | null> {
    const userId = await kv.get(`user_email:${email}`);
    if (!userId) return null;
    return this.getUser(userId as string);
  },

  async getBusinessCard(id: string): Promise<BusinessCard | null> {
    return kv.hgetall(`business_card:${id}`);
  },

  async getBusinessCardByUsername(username: string): Promise<BusinessCard | null> {
    const cardId = await kv.get(`username:${username}`);
    if (!cardId) return null;
    return this.getBusinessCard(cardId as string);
  },

  async getBusinessCardWithUser(id: string): Promise<{ businessCard: BusinessCard; user: User } | null> {
    const businessCard = await this.getBusinessCard(id);
    if (!businessCard) return null;
    const user = await this.getUser(businessCard.userId);
    if (!user) return null;
    return { businessCard, user };
  },

  async getContacts(businessCardId: string): Promise<Contact[]> {
    return kv.lrange(`contacts:${businessCardId}`, 0, -1);
  },

  async getSocialLinks(businessCardId: string): Promise<SocialLink[]> {
    return kv.lrange(`social_links:${businessCardId}`, 0, -1);
  }
};

export { kv }; 