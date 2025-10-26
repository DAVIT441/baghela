// Initialize localStorage with mock data on first visit
import { 
  getGardens, 
  getHelpers, 
  getProjects, 
  getMarketplaceItems,
  getUser,
  saveGardens,
  saveHelpers,
  saveProjects,
  saveMarketplaceItems,
  saveUser,
} from './storage';
import { mockGardens, mockHelpers, mockProjects, mockMarketplaceItems, mockUser } from './mockData';

export const initializeStorage = () => {
  // Only initialize if storage is empty
  if (getGardens().length === 0) {
    saveGardens(mockGardens);
  }
  
  if (getHelpers().length === 0) {
    saveHelpers(mockHelpers);
  }
  
  if (getProjects().length === 0) {
    saveProjects(mockProjects);
  }
  
  if (getMarketplaceItems().length === 0) {
    saveMarketplaceItems(mockMarketplaceItems);
  }
  
  if (!getUser()) {
    saveUser(mockUser);
  }
};
