import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartInitialState } from "../types/cart/cartItemTypes";
import { ICartItem } from "../types/cart/cartItemTypes";
import { updateCart } from "../utils/cartUtils";

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

      return updateCart(state);
    },
  },
});

// action reducers
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer; // exported in store.ts as cartSliceReducer
