import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  stock: number;
  description: string;
  status: 'activo' | 'descontinuado';
  sku: string;
  images: string[];
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    status: { type: String, enum: ['activo', 'descontinuado'], default: 'activo' },
    sku: { type: String, required: true, unique: true },
    images: [{ type: String }],
    category: { type: String, required: true }
  },
  { timestamps: true }
);

export const ProductModel = model<IProduct>('Product', productSchema);
