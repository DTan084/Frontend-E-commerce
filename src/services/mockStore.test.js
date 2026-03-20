import mockStoreService from './mockStore';
import { STORAGE_KEYS } from '../constants/storageKeys';

describe('mockStoreService', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    localStorage.clear();
    mockStoreService.init();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('creates an order and clears cart', async () => {
    const cartItems = [
      {
        id: 101,
        name: 'Demo Product',
        image: 'https://example.com/demo.jpg',
        price: 200000,
        quantity: 2,
      },
    ];

    const createOrderPromise = mockStoreService.orders.create(cartItems, {
      fullName: 'Test User',
      email: 'test@example.com',
    });

    jest.advanceTimersByTime(500);
    const order = await createOrderPromise;

    expect(order.status).toBe('completed');
    expect(order.total).toBe(400000);
    expect(order.items).toHaveLength(1);
    expect(order.items[0].licenseKey).toContain('TMDT-');

    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.CART))).toEqual([]);
    const storedOrders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS));
    expect(storedOrders[0].id).toBe(order.id);
  });

  test('adds existing product in cart by increasing quantity', async () => {
    const firstAddPromise = mockStoreService.cart.add({
      id: 501,
      name: 'Template A',
      price: 100000,
      quantity: 1,
    });
    jest.advanceTimersByTime(100);
    await firstAddPromise;

    const secondAddPromise = mockStoreService.cart.add({
      id: 501,
      name: 'Template A',
      price: 100000,
      quantity: 2,
    });
    jest.advanceTimersByTime(100);
    const cart = await secondAddPromise;

    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(3);
  });
});
