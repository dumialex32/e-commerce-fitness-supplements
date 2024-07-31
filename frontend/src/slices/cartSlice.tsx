import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { addDecimals } from "../utils/formatters";
import { ICartItem, ICartSliceState } from "../types/cart/cartItemTypes";

const localStorageCart: string | null = localStorage.getItem("cart");

const initialState: ICartSliceState = localStorageCart
  ? JSON.parse(localStorageCart)
  : {
      cartItems: [],
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const item: ICartItem = action.payload;
      const existItem: ICartItem | undefined = state.cartItems.find(
        (x) => x._id === item._id
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // calc items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => (acc += item.price) * item.qty, 0)
      );

      // calc shipping price ( if order price > 65, free shipping )
      state.shippingPrice = addDecimals(state.itemsPrice > 65 ? 0 : 8);

      // calc tax price
      state.taxPrice = addDecimals(0.15 * state.itemsPrice);

      // calc total price
      state.totalPrice = addDecimals(
        state.itemsPrice + state.shippingPrice + state.taxPrice
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

// reducer actions
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
