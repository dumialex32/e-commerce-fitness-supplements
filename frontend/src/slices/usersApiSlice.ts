import { USERS_URL } from "../constants";
import apiSlice from "./apiSlice";
import { LoginData, UserInfo } from "../types/authTypes/authSliceTypes";
import {
  UpdateUserMutationProps,
  User,
} from "../types/userTypes/usersSliceTypes";

// to do: add query types

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserInfo, LoginData>({
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

    profile: builder.mutation({
      query: (body) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    getUsers: builder.query<User[], void>({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["User"],
    }),

    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation<User, UpdateUserMutationProps>({
      query: ({ userId, ...patch }) => ({
        url: `${USERS_URL}/${userId}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUsersQuery,
} = userApiSlice;
