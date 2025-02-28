import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICartInitialState,
  ShippingAddress,
} from "../types/cartTypes/cartItemTypes";
import { ICartItem } from "../types/cartTypes/cartItemTypes";
import { updateCart } from "../utils/cartUtils";
import { getLocalStorageItem } from "../utils/localStorageUtils";

const initialState: ICartInitialState = getLocalStorageItem("cart") || {
  cartItems: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  shippingAddress: {
    address: "",
    city: "",
    postalCode: "",
    country: "",
  },
  paymentMethod: "",
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const item: ICartItem = action.payload;
      const existItem = state.cartItems?.find((x) => x._id === item._id);

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

    removeCartItem: (state, action: { payload: string }) => {
      const itemId: string = action.payload;

      // remove the item from cart state
      state.cartItems = state.cartItems.filter((x) => x._id !== itemId);

      // update local storage cart item with the new state
      updateCart(state);
    },

    storeShippingAddress: (state, action) => {
      const shippingAddress: ShippingAddress = action.payload;
      state.shippingAddress = shippingAddress;
      updateCart(state);
    },

    storePaymentMethod: (state, action) => {
      const payment = action.payload;
      state.paymentMethod = payment;
      updateCart(state);
    },

    clearCartItems: (state) => {
      state.cartItems = [];
      updateCart(state);
    },
  },
});

// action reducers
export const {
  addToCart,
  removeCartItem,
  storeShippingAddress,
  storePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer; // exported in store.ts as cartSliceReducer
