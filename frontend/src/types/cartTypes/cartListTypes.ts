import { ReactNode } from "react";
import { ICartItem } from "./cartItemTypes";

export interface ICartListProps {
  cartItems: ICartItem[];
  render: (item: ICartItem) => ReactNode;
}
