import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_PRICE } from "../constants";
import { ICartInitialState } from "../types/cart/cartItemTypes";
import { addDecimals } from "./formatters";

export const updateCart = (state: ICartInitialState): ICartInitialState => {
  // calc items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc: number, item) => acc + item.price * item.qty,
      0
    )
  );

  // calc item tax price
  state.taxPrice = addDecimals((state.itemsPrice * 15) / 100);

  // calc item shipping price ( if cartItems price > 65 shipping is free)
  state.shippingPrice = addDecimals(
    state.itemsPrice > FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_PRICE
  );

  // calc total price
  state.totalPrice = addDecimals(
    state.itemsPrice + state.taxPrice + state.shippingPrice
  );

  // save the current state of cart in local storage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
