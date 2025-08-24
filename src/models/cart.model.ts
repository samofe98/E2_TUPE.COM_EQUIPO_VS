export interface CartItem {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
}