import { Types } from 'mongoose';

// Stationery Order Interface
export interface TOrder {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  created_at?: Date;
  updated_at?: Date;
}
export type CartItem = {
  _id: string;
};

export type OrderData = {
  product: string;
  totalAmount: number;
  currency: string;
  paymentId: string;
  paymentStatus: string;
  user: Types.ObjectId;
  orderDate: Date;
};