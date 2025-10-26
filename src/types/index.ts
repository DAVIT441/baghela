// Data types for ბაღელა platform

export interface Garden {
  id: string;
  name: string;
  location: string;
  area: number; // მ²
  type: string;
  owner: string;
  description: string;
  forRent: boolean;
  rentalTerms?: RentalTerms;
  image?: string;
}

export interface RentalTerms {
  duration: string;
  harvestType: string;
  harvestShare: number; // percentage
  conditions: string;
}

export interface Helper {
  id: string;
  name: string;
  skills: string[];
  experience: string;
  rating: number;
  completedJobs: number;
  phone?: string;
  badges: string[];
  image?: string;
}

export interface VolunteerProject {
  id: string;
  title: string;
  description: string;
  organizer: string;
  date: string;
  location: string;
  points: number;
  participants: number;
  maxParticipants: number;
  image?: string;
  category: string;
}

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  points: number;
  category: 'seedling' | 'seed' | 'fertilizer' | 'prize';
  stock: number;
  image?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  points: number;
  level: number;
  badges: string[];
  joinedDate: string;
  activities: Activity[];
  purchases: Purchase[];
}

export interface Activity {
  id: string;
  type: 'volunteer' | 'rent' | 'helper';
  title: string;
  date: string;
  points: number;
}

export interface Purchase {
  id: string;
  itemName: string;
  points: number;
  date: string;
}
