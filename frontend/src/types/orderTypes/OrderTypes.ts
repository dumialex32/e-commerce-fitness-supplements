import { ICartItem, ShippingAddress } from "../cartTypes/cartItemTypes";

export interface Order {
  orderItems: ICartItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  shippingAddress: ShippingAddress;
  totalPrice: number;
  paymentMethod: string;
}

export interface IOrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
  _id: string;
}

export interface OrderData {
  user: string;
  orderItems: IOrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  paymentResult?: PaymentResult;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}
