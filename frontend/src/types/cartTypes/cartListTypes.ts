import { ReactNode } from "react";
import { ICartItem } from "./cartItemTypes";

export interface CartListProps {
  cartItems: ICartItem[];
  render: (item: ICartItem) => ReactNode;
}
