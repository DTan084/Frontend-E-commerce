/**
 * Mock Store Service - Simulate async data operations with localStorage
 * Allows testing full e-commerce flow: Add to Cart → Checkout → Orders
 */

import { getAllProducts } from '../data/mockProducts';
import { STORAGE_KEYS } from '../constants/storageKeys';

const isStorageAvailable = () => typeof window !== 'undefined' && !!window.localStorage;

// Helper functions for localStorage
const getFromStorage = (key, defaultValue = []) => {
  if (!isStorageAvailable()) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const saveToStorage = (key, value) => {
  if (!isStorageAvailable()) return false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

// Initialize mock data
const initializeMockData = () => {
  if (!isStorageAvailable()) return;
  // Initialize products if not exists
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    const products = getAllProducts();
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
  }

  // Initialize empty orders if not exists
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    saveToStorage(STORAGE_KEYS.ORDERS, []);
  }
};

// Generate unique ID
const generateId = (prefix = 'ORD') => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

// Generate license key
const generateLicenseKey = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments = 5;
  const segmentLength = 4;

  let key = 'TMDT';
  for (let i = 0; i < segments; i++) {
    let segment = '';
    for (let j = 0; j < segmentLength; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    key += '-' + segment;
  }
  return key;
};

// Mock Store Service
export const mockStoreService = {
  // Initialize
  init: () => {
    initializeMockData();
  },

  // Orders API
  orders: {
    // Get all orders for current user
    getAll: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const orders = getFromStorage(STORAGE_KEYS.ORDERS);
          resolve(orders);
        }, 300); // Simulate network delay
      });
    },

    // Get single order
    getById: (orderId) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const orders = getFromStorage(STORAGE_KEYS.ORDERS);
          const order = orders.find((o) => o.id === orderId);
          if (order) {
            resolve(order);
          } else {
            reject(new Error('Order not found'));
          }
        }, 300);
      });
    },

    // Create new order from cart
    create: (cartItems, billingInfo) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const orders = getFromStorage(STORAGE_KEYS.ORDERS);

          // Calculate total
          const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

          // Create order items with license keys
          const orderItems = cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            licenseKey: generateLicenseKey(),
            downloadCount: 0,
            lastDownload: null,
          }));

          // Create new order
          const newOrder = {
            id: generateId('ORD'),
            date: new Date().toISOString(),
            status: 'completed', // Auto-complete for testing
            total: total,
            items: orderItems,
            completedDate: new Date().toISOString(),
            downloadLink: `/downloads/${generateId('DL')}`,
            billingInfo: billingInfo,
            createdAt: Date.now(),
          };

          // Add to orders array
          orders.unshift(newOrder); // Add to beginning
          saveToStorage(STORAGE_KEYS.ORDERS, orders);

          // Clear cart after order
          saveToStorage(STORAGE_KEYS.CART, []);

          resolve(newOrder);
        }, 500);
      });
    },

    // Update order status
    updateStatus: (orderId, newStatus) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const orders = getFromStorage(STORAGE_KEYS.ORDERS);
          const orderIndex = orders.findIndex((o) => o.id === orderId);

          if (orderIndex !== -1) {
            orders[orderIndex].status = newStatus;
            if (newStatus === 'completed') {
              orders[orderIndex].completedDate = new Date().toISOString();
            }
            saveToStorage(STORAGE_KEYS.ORDERS, orders);
            resolve(orders[orderIndex]);
          } else {
            reject(new Error('Order not found'));
          }
        }, 300);
      });
    },

    // Cancel order
    cancel: (orderId, reason) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const orders = getFromStorage(STORAGE_KEYS.ORDERS);
          const orderIndex = orders.findIndex((o) => o.id === orderId);

          if (orderIndex !== -1) {
            orders[orderIndex].status = 'cancelled';
            orders[orderIndex].cancelReason = reason;
            orders[orderIndex].cancelledAt = new Date().toISOString();
            saveToStorage(STORAGE_KEYS.ORDERS, orders);
            resolve(orders[orderIndex]);
          } else {
            reject(new Error('Order not found'));
          }
        }, 300);
      });
    },

    // Track download
    trackDownload: (orderId, itemId) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const orders = getFromStorage(STORAGE_KEYS.ORDERS);
          const order = orders.find((o) => o.id === orderId);

          if (order) {
            const item = order.items.find((i) => i.id === itemId);
            if (item) {
              item.downloadCount = (item.downloadCount || 0) + 1;
              item.lastDownload = new Date().toISOString();
              saveToStorage(STORAGE_KEYS.ORDERS, orders);
              resolve(item);
            } else {
              reject(new Error('Item not found'));
            }
          } else {
            reject(new Error('Order not found'));
          }
        }, 300);
      });
    },
  },

  // Products API
  products: {
    getAll: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const products = getFromStorage(STORAGE_KEYS.PRODUCTS, getAllProducts());
          resolve(products);
        }, 300);
      });
    },

    getById: (productId) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const products = getFromStorage(STORAGE_KEYS.PRODUCTS, getAllProducts());
          const product = products.find((p) => p.id === productId);
          if (product) {
            resolve(product);
          } else {
            reject(new Error('Product not found'));
          }
        }, 300);
      });
    },
  },

  // Cart API (optional - CartContext can still use localStorage directly)
  cart: {
    get: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const cart = getFromStorage(STORAGE_KEYS.CART);
          resolve(cart);
        }, 100);
      });
    },

    add: (product) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const cart = getFromStorage(STORAGE_KEYS.CART);
          const quantityToAdd = Math.max(1, Number(product?.quantity) || 1);
          const existingIndex = cart.findIndex((item) => item.id === product.id);

          if (existingIndex !== -1) {
            cart[existingIndex].quantity += quantityToAdd;
          } else {
            cart.push({ ...product, quantity: quantityToAdd });
          }

          saveToStorage(STORAGE_KEYS.CART, cart);
          resolve(cart);
        }, 100);
      });
    },

    remove: (productId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let cart = getFromStorage(STORAGE_KEYS.CART);
          cart = cart.filter((item) => item.id !== productId);
          saveToStorage(STORAGE_KEYS.CART, cart);
          resolve(cart);
        }, 100);
      });
    },

    clear: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          saveToStorage(STORAGE_KEYS.CART, []);
          resolve([]);
        }, 100);
      });
    },
  },

  // Admin functions
  admin: {
    // Clear all data (for testing)
    clearAllData: () => {
      [STORAGE_KEYS.ORDERS, STORAGE_KEYS.CART, STORAGE_KEYS.PRODUCTS].forEach((key) => {
        localStorage.removeItem(key);
      });
      initializeMockData();
      console.log('✅ All mock data cleared and reset!');
    },

    // Reset to initial state with sample orders
    resetWithSampleData: () => {
      // Clear first
      mockStoreService.admin.clearAllData();

      // Add sample orders
      const sampleOrders = [
        {
          id: 'ORD-2025-001',
          date: '2025-11-15T10:30:00Z',
          status: 'completed',
          total: 1500000,
          items: [
            {
              id: 1,
              name: 'Mã Nguồn Website Thương Mại Điện Tử - React + PHP',
              image:
                'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
              price: 1500000,
              quantity: 1,
              licenseKey: 'TMDT-DEMO-A1B2-C3D4-E5F6',
              downloadCount: 3,
              lastDownload: '2025-11-20T14:20:00Z',
            },
          ],
          completedDate: '2025-11-15T10:35:00Z',
          downloadLink: '/downloads/sample-001',
        },
      ];

      saveToStorage(STORAGE_KEYS.ORDERS, sampleOrders);
      console.log('✅ Sample data loaded!');
    },

    // Get all storage data (for debugging)
    getAllData: () => {
      return {
        orders: getFromStorage(STORAGE_KEYS.ORDERS),
        cart: getFromStorage(STORAGE_KEYS.CART),
        products: getFromStorage(STORAGE_KEYS.PRODUCTS, getAllProducts()),
      };
    },
  },
};

// Expose to window for debugging (optional)
if (typeof window !== 'undefined') {
  window.mockStore = mockStoreService;
  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 Mock Store loaded! Use window.mockStore in console for debugging');
  }
}

export default mockStoreService;
