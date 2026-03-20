import {
  appDataService,
  authDataService,
  cartDataService,
  searchDataService,
  ordersDataService,
} from './index';
import { STORAGE_KEYS } from '../../constants/storageKeys';

describe('data services', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    localStorage.clear();
    appDataService.init();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('authDataService persists and clears session', () => {
    const user = { id: 1, name: 'Demo User', role: 'user' };
    const token = 'mock-token';

    const saved = authDataService.setSession({ user, token });
    expect(saved).toBe(true);

    expect(authDataService.getSession()).toEqual({ user, token });

    authDataService.updateUser({ ...user, name: 'Updated User' });
    expect(authDataService.getSession().user.name).toBe('Updated User');

    const cleared = authDataService.clearSession();
    expect(cleared).toBe(true);
    expect(authDataService.getSession()).toEqual({ user: null, token: null });
  });

  test('cartDataService and searchDataService manage storage values', () => {
    const cart = [{ id: 101, name: 'Template', price: 100000, quantity: 2 }];
    const searchHistory = ['react admin', 'laravel ecommerce'];

    expect(cartDataService.getCart()).toBeNull();

    cartDataService.saveCart(cart);
    searchDataService.saveHistory(searchHistory);

    expect(cartDataService.getCart()).toEqual(cart);
    expect(searchDataService.getHistory()).toEqual(searchHistory);

    searchDataService.clearHistory();
    expect(searchDataService.getHistory()).toEqual([]);
  });

  test('ordersDataService creates and retrieves orders', async () => {
    const cartItems = [{ id: 1, name: 'Product A', image: '/a.png', price: 200000, quantity: 1 }];

    const createPromise = ordersDataService.create(cartItems, { email: 'a@demo.com' });
    jest.advanceTimersByTime(500);
    const createdOrder = await createPromise;

    expect(createdOrder.status).toBe('completed');
    expect(createdOrder.items[0].licenseKey).toContain('TMDT-');

    const getAllPromise = ordersDataService.getAll();
    jest.advanceTimersByTime(300);
    const orders = await getAllPromise;

    expect(orders.length).toBeGreaterThan(0);
    expect(orders[0].id).toBe(createdOrder.id);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.CART))).toEqual([]);
  });
});
