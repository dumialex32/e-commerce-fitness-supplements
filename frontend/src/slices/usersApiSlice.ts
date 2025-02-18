import { USERS_URL } from "../constants";
import apiSlice from "./apiSlice";
import {
  DeleteUserProps,
  DeleteUserResponse,
  GetUsersResponse,
  LoginProps,
  LoginResponse,
  LogoutResponse,
  RegisterProps,
  RegisterResponse,
  UpdateUserMutationProps,
  UpdateUserResponse,
} from "../types/userTypes/usersSliceTypes";

// to do: add query types

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginProps>({
      query: (body) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    register: builder.mutation<RegisterResponse, RegisterProps>({
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

    getUsers: builder.query<GetUsersResponse, void>({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["User"],
    }),

    deleteUser: builder.mutation<DeleteUserResponse, DeleteUserProps>({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation<UpdateUserResponse, UpdateUserMutationProps>({
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
