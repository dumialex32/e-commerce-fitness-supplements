import { ReactNode } from "react";
import { ICartItem } from "../../types/cart/cartItemTypes";

export interface ICartListProps {
  cartItems: ICartItem[];
  render: (item: ICartItem) => ReactNode;
}
