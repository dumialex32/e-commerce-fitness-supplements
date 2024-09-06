import { USERS_URL } from "../constants";
import apiSlice from "./apiSlice";
import { ILoginData, IUserInfo } from "../types/user/authSliceTypes";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IUserInfo, ILoginData>({
      query: (body) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    register: builder.mutation({
      query: (body) => ({
        url: USERS_URL,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  userApiSlice as any;
