import { IProduct } from "../products/productTypes";

export interface ICartItem extends IProduct {
  qty: number;
}

export interface ICartSliceState {
  cartItems: ICartItem[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}
