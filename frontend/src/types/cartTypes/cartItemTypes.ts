import { Product } from "../productsTypes/productTypes";

export interface ICartItem extends Product {
  qty: number;
}

export interface ShippingAddress {
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
  shippingAddress: ShippingAddress;
  totalPrice: number;
  paymentMethod: string;
}
