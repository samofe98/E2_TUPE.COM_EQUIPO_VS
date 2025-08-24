import { CartItem } from './cart.model';

export type OrderStatus = 'PENDIENTE' | 'PREPARANDO' | 'EN_TRANSITO' | 'EN_ENTREGA' | 'ENTREGADO' | 'CANCELADO';

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  items: CartItem[];
  total: number;
  trackingNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}