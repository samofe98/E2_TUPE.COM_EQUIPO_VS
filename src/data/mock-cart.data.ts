import { Cart } from '../models/cart.model';

export const mockCart: Cart = {
  id: 'cart-abc123xyz',
  userId: 'user-f6g7h8i9j0', // Asociado al "Normal User"
  items: [
    {
      productId: 'prod-001',
      quantity: 1,
      priceAtPurchase: 350000
    },
    {
      productId: 'prod-002',
      quantity: 2,
      priceAtPurchase: 1200000
    }
  ],
  total: 2750000,
  createdAt: new Date(),
  updatedAt: new Date()
};