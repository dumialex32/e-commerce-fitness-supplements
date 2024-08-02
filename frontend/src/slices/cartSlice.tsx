import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartInitialState } from "../types/cart/cartItemTypes";
import { ICartItem } from "../types/cart/cartItemTypes";
import { addDecimals } from "../utils/formatters";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_PRICE } from "../constants";

const savedCart: string | null = localStorage.getItem("cart");

const initialState: ICartInitialState = savedCart
  ? JSON.parse(savedCart)
  : {
      cartItems: [],
      itemsPrice: 0,
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const item: ICartItem = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      // update the already existing item
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // calc items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => {
          return (acc += item.price * item.qty);
        }, 0)
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
    },
  },
});

// action reducers
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer; // exported in store.ts as cartSliceReducer
