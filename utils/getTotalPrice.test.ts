import getTotalPrice from './getTotalPrice';
import { CartItemI } from '../types/index';

const mockItem = (overrides?: Partial<CartItemI>): CartItemI => ({
  price: 0,
  amount: 0,
  color: 'black',
  image: 'default-image.jpg',
  name: 'Test Item',
  section: 'Test section',
  instrumentId: 'default-id',
  brandName: 'Test Brand Name',
  instrumentType: 'Test Instrument Type',
  ...overrides,
});

describe('getTotalPrice', () => {
  it('should return 0 for an empty cart', () => {
    const items: CartItemI[] = [];
    expect(getTotalPrice(items)).toBe(0);
  });

  it('should calculate the total price correctly for one item', () => {
    const items: CartItemI[] = [
      mockItem({ price: 100, amount: 2 }),
    ];
    expect(getTotalPrice(items)).toBe(200);
  });

  it('should calculate the total price correctly for multiple items', () => {
    const items: CartItemI[] = [
      mockItem({ price: 50, amount: 1 }),
      mockItem({ price: 200, amount: 3 }),
    ];
    expect(getTotalPrice(items)).toBe(650);
  });

  it('should handle items with zero amount or price', () => {
    const items: CartItemI[] = [
      mockItem({ price: 50, amount: 0 }),
      mockItem({ price: 0, amount: 5 }),
    ];
    expect(getTotalPrice(items)).toBe(0);
  });

  it('should handle decimal prices correctly', () => {
    const items: CartItemI[] = [
      mockItem({ price: 19.99, amount: 2 }),
    ];
    expect(getTotalPrice(items)).toBeCloseTo(39.98, 2);
  });
});
