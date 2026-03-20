import mockStoreService from '../mockStore';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import { storageService } from '../storage/storageService';

export const appDataService = {
  init: () => {
    mockStoreService.init();
  },
};

export const authDataService = {
  getSession: () => ({
    token: storageService.getItem(STORAGE_KEYS.AUTH_TOKEN, null),
    user: storageService.getItem(STORAGE_KEYS.USER_DATA, null),
  }),

  setSession: ({ user, token }) => {
    const tokenSaved = storageService.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    const userSaved = storageService.setItem(STORAGE_KEYS.USER_DATA, user);
    return tokenSaved && userSaved;
  },

  clearSession: () => {
    const tokenRemoved = storageService.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    const userRemoved = storageService.removeItem(STORAGE_KEYS.USER_DATA);
    return tokenRemoved && userRemoved;
  },

  updateUser: (updatedUser) => {
    return storageService.setItem(STORAGE_KEYS.USER_DATA, updatedUser);
  },
};

export const cartDataService = {
  getCart: () => storageService.getItem(STORAGE_KEYS.CART, null),
  saveCart: (items) => storageService.setItem(STORAGE_KEYS.CART, items),
};

export const searchDataService = {
  getHistory: () => storageService.getItem(STORAGE_KEYS.SEARCH_HISTORY, []),
  saveHistory: (history) => storageService.setItem(STORAGE_KEYS.SEARCH_HISTORY, history),
  clearHistory: () => storageService.removeItem(STORAGE_KEYS.SEARCH_HISTORY),
};

export const ordersDataService = {
  getAll: () => mockStoreService.orders.getAll(),
  create: (items, billingInfo) => mockStoreService.orders.create(items, billingInfo),
  trackDownload: (orderId, itemId) => mockStoreService.orders.trackDownload(orderId, itemId),
};
