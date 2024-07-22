import { Document, Types } from "mongoose";

export interface IOrderItemSchema {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: Types.ObjectId;
}

export interface IShippingAddressSchema {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IPaymentResult {
  id?: string;
  status?: string;
  update_time?: string;
  emailAddress?: string;
}

// extending Document for the main schema interface
export interface IOrderSchema extends Document {
  user: Types.ObjectId;
  orderItems: IOrderItemSchema[];
  shippingAddress: IShippingAddressSchema;
  paymentMethod: string;
  paymentResult?: IPaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
