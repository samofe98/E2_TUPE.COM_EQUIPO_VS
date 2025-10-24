import { Schema, model, Document } from 'mongoose';

export interface IUserAddress {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  isEmailConfirmed: boolean;
  address?: IUserAddress;
  createdAt?: Date;
  updatedAt?: Date;
}

const userAddressSchema = new Schema<IUserAddress>(
  {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  { _id: false } // evita crear un _id dentro del subdocumento de address
);

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    isEmailConfirmed: { type: Boolean, default: false },
    address: userAddressSchema,
  },
  { timestamps: true }
);

export const UserModel = model<IUser>('User', userSchema);
