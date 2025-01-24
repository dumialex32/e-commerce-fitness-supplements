import { USERS_URL } from "../constants";
import apiSlice from "./apiSlice";
import { ILoginData, IUserInfo } from "../types/authTypes/authSliceTypes";
import { IUser } from "../types/userTypes/usersSliceTypes";

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

    profile: builder.mutation({
      query: (body) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    getUsers: builder.query<IUser[], void>({
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

    updateUser: builder.mutation({
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
} = userApiSlice as any;
