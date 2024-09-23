import { IProduct } from "../productsTypes/productTypes";

export interface ICartItem extends IProduct {
  qty: number;
}

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface ICartInitialState {
  cartItems: ICartItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  shippingAddress: IShippingAddress;
  totalPrice: number;
  paymentMethod: string;
}
