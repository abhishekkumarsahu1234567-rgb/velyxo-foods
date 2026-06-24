export interface Review {
  id: string;
  eventName: string;
  clientName: string;
  eventDate: string;
  eventType: 'Wedding Reception' | 'Corporate Meeting' | 'Conference' | 'Birthday Party' | 'Private Event' | 'Product Launch' | 'Annual Gathering' | string;
  npsScore: number; // 0 to 10
  foodQuality: number; // 1 to 5
  serviceQuality: number; // 1 to 5
  staffBehaviour: number; // 1 to 5
  hygieneCleanliness: number; // 1 to 5
  presentationSetup: number; // 1 to 5
  comment: string;
  satisfactionEmoji: 'Very Dissatisfied' | 'Dissatisfied' | 'Neutral' | 'Satisfied' | 'Extremely Satisfied' | string;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Corporate Events' | 'Wedings' | 'Product Launches' | string;
  image: string;
  description: string;
  client: string;
  date: string;
}

export interface KitchenImage {
  id: string;
  category: 'Kitchen Setup' | 'Food Preparation' | 'Chef Team' | 'Finished Dishes' | 'Event Setup';
  image: string;
  title: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  guestsCount: number;
  cuisinePreference: string;
  message: string;
}
