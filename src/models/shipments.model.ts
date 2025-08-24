import { OrderStatus } from './order.model';

export interface ShipmentHistory {
  status: OrderStatus;
  timestamp: Date;
}

export interface Shipment {
  orderId: string;
  trackingNumber: string;
  status: OrderStatus;
  history: ShipmentHistory[];
  createdAt?: Date;
  updatedAt?: Date;
}