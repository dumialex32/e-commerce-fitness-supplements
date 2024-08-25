import { createSlice } from "@reduxjs/toolkit";
import { IAuthSlice } from "../types/user/authSliceTypes";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorageUtils";
import isEmpty from "lodash/isEmpty";

const initialState: IAuthSlice = {
  userInfo: isEmpty(getLocalStorageItem("userInfo")) // isEmpty checks for empty object, if empty return null
    ? null
    : getLocalStorageItem("userInfo"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const userInfo = action.payload;

      state.userInfo = userInfo;
      setLocalStorageItem("userInfo", userInfo);
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
