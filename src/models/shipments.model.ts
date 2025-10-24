import { Schema, model, Document, Types } from 'mongoose';
import { OrderStatus } from './order.model';

export interface IShipmentHistory {
  status: OrderStatus;
  timestamp: Date;
}

export interface IShipment extends Document {
  userId: Types.ObjectId;           // agregado
  orderId: Types.ObjectId;
  trackingNumber: string;
  status: OrderStatus;
  history: IShipmentHistory[];
  createdAt: Date;
  updatedAt: Date;
}

// Subschema para el historial del envío
const shipmentHistorySchema = new Schema<IShipmentHistory>({
  status: {
    type: String,
    enum: ['PENDIENTE', 'PREPARANDO', 'EN_TRANSITO', 'EN_ENTREGA', 'ENTREGADO', 'CANCELADO'],
    required: true
  },
  timestamp: { type: Date, default: Date.now }
});

// Schema principal de envíos
const shipmentSchema = new Schema<IShipment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // agregado
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    trackingNumber: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ['PENDIENTE', 'PREPARANDO', 'EN_TRANSITO', 'EN_ENTREGA', 'ENTREGADO', 'CANCELADO'],
      default: 'PENDIENTE'
    },
    history: [shipmentHistorySchema]
  },
  { timestamps: true } // crea automáticamente createdAt y updatedAt
);

export const ShipmentModel = model<IShipment>('Shipment', shipmentSchema);
