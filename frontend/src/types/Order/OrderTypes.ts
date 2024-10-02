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
