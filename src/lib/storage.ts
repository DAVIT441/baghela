import { Garden, Helper, VolunteerProject, MarketplaceItem, UserProfile } from '@/types';

// localStorage utilities for ბაღელა

const KEYS = {
  GARDENS: 'baghela_gardens',
  HELPERS: 'baghela_helpers',
  PROJECTS: 'baghela_projects',
  MARKETPLACE: 'baghela_marketplace',
  USER: 'baghela_user',
};

// Generic storage functions
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const saveToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Gardens
export const getGardens = (): Garden[] => getFromStorage(KEYS.GARDENS, []);
export const saveGardens = (gardens: Garden[]) => saveToStorage(KEYS.GARDENS, gardens);
export const addGarden = (garden: Garden) => {
  const gardens = getGardens();
  saveGardens([...gardens, garden]);
};

// Helpers
export const getHelpers = (): Helper[] => getFromStorage(KEYS.HELPERS, []);
export const saveHelpers = (helpers: Helper[]) => saveToStorage(KEYS.HELPERS, helpers);

// Projects
export const getProjects = (): VolunteerProject[] => getFromStorage(KEYS.PROJECTS, []);
export const saveProjects = (projects: VolunteerProject[]) => saveToStorage(KEYS.PROJECTS, projects);

// Marketplace
export const getMarketplaceItems = (): MarketplaceItem[] => getFromStorage(KEYS.MARKETPLACE, []);
export const saveMarketplaceItems = (items: MarketplaceItem[]) => saveToStorage(KEYS.MARKETPLACE, items);

// User
export const getUser = (): UserProfile | null => getFromStorage(KEYS.USER, null);
export const saveUser = (user: UserProfile) => saveToStorage(KEYS.USER, user);
export const updateUserPoints = (points: number) => {
  const user = getUser();
  if (user) {
    user.points += points;
    saveUser(user);
  }
};
