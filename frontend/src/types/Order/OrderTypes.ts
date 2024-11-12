import { ICartItem, IShippingAddress } from "../cartTypes/cartItemTypes";

export interface IOrder {
  orderItems: ICartItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  shippingAddress: IShippingAddress;
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

export interface IOrderResponse {
  user: string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
