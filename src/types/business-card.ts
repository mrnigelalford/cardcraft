export interface BusinessCardData {
  id: string;
  username: string;
  photo?: string;
  name: string;
  title?: string;
  bio?: string;
  resume?: string;
  contacts: ContactInfo[];
  socialLinks: SocialLink[];
  theme?: CardTheme;
}

export interface ContactInfo {
  id: string;
  type: 'email' | 'phone' | 'location' | 'website';
  value: string;
  icon?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon?: string;
}

export interface CardTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  layout: 'vertical' | 'horizontal';
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subscribeNewsletter: boolean;
  requestMeeting: boolean;
} 