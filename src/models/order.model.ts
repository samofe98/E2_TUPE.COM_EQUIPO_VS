import { Schema, model, Document, Types } from 'mongoose';

// Reutilizamos la estructura del item del carrito
export interface IOrderItem {
  productId: Types.ObjectId;
  quantity: number;
  priceAtPurchase: number;
}

export type OrderStatus =
  | 'PENDIENTE'
  | 'PREPARANDO'
  | 'EN_TRANSITO'
  | 'EN_ENTREGA'
  | 'ENTREGADO'
  | 'CANCELADO';

// Interfaz principal de la orden
export interface IOrder extends Document {
  userId: Types.ObjectId;
  status: OrderStatus;
  items: IOrderItem[];
  total: number;
  trackingNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema de items (cada producto en la orden)
const orderItemSchema = new Schema<IOrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  priceAtPurchase: { type: Number, required: true }
});

// Schema principal de la orden
const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['PENDIENTE', 'PREPARANDO', 'EN_TRANSITO', 'EN_ENTREGA', 'ENTREGADO', 'CANCELADO'],
      default: 'PENDIENTE'
    },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    trackingNumber: { type: String, required: true, unique: true }
  },
  { timestamps: true } // genera createdAt y updatedAt automáticamente
);

export const OrderModel = model<IOrder>('Order', orderSchema);
