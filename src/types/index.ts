export interface Service {
  id: string;
  name: string;
  category: 'facial' | 'hair' | 'nails' | 'makeup' | 'lash-brow' | 'spa' | 'themed';
  duration: string;
  price: number;
  priceDisplay: string;
  description: string;
  inclusions: string[];
  benefits: string[];
  popular?: boolean;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  category: 'hair' | 'makeup' | 'nails' | 'spa';
  image: string;
  fullImage: string;
  description: string;
}

export interface BridalPackage {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  highlights: string[];
  recommendedFor: string;
  image: string;
}

export interface BridalAddon {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  image: string;
  rating: number;
  reviewsCount: number;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  avatarLetter: string;
  verified?: boolean;
}

export interface Booking {
  id: string;
  bookingCode: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceName: string;
  stylistName: string;
  date: string;
  timeSlot: string;
  notes?: string;
  totalPrice: number;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface UserProfile {
  username: string;
  email: string;
  phone: string;
  avatarUrl: string;
  avatarColor: string;
  skinType?: string;
  membershipTier: 'Glow Member' | 'Glow VIP' | 'Royal Bridal Privileged';
  notificationsEnabled: boolean;
}

export interface TutorialStep {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  targetElementId?: string;
  icon: string;
  tip: string;
}

