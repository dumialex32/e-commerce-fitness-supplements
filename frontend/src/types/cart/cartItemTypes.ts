import { IProduct } from "../products/productTypes";

export interface ICartItem extends IProduct {
  qty: number;
}

export interface ICartInitialState {
  cartItems: ICartItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}
