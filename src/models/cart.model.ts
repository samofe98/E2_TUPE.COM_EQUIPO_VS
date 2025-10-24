import { Schema, model, Document, Types } from 'mongoose';

// Interfaz extendida de Mongoose
export interface ICartItem {
  productId: Types.ObjectId;
  quantity: number;
  priceAtPurchase: number;
}

export interface ICart extends Document {
  userId: Types.ObjectId;
  items: ICartItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

// Esquema Mongoose
const cartItemSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  priceAtPurchase: { type: Number, required: true }
});

const cartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
    total: { type: Number, required: true, default: 0 }
  },
  { timestamps: true } // crea automáticamente createdAt y updatedAt
);

export const CartModel = model<ICart>('Cart', cartSchema);
