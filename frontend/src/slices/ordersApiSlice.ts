import { PAYPAL_URL } from "../constants";
import { ORDERS_URL } from "../constants";
import { IOrder, IOrderResponse } from "../types/Order/OrderTypes";
import apiSlice from "./apiSlice";

const ordersSliceApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMyOrders: build.query<IOrder[], void>({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
      keepUnusedDataFor: 5000,
      providesTags: ["Order"],
    }),

    getOrderDetails: build.query<IOrderResponse, string>({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5000,
    }),

    createOrder: build.mutation<IOrderResponse, IOrder>({
      query: (order) => ({
        url: `${ORDERS_URL}`,
        method: "POST",
        body: { ...order },
      }),
      invalidatesTags: ["Order"],
    }),

    updateOrderToPaid: build.mutation({
      query: ({ orderId, ...details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),

    getPaypalClientId: build.query<{ clientId: string }, void>({
      query: () => ({ url: PAYPAL_URL, method: "GET" }),
      keepUnusedDataFor: 5000,
    }),

    updateOrderToDelivered: build.mutation<
      IOrderResponse,
      { id: string; isDelivered: boolean }
    >({
      query: ({ id, isDelivered }) => ({
        url: `${ORDERS_URL}/${id}/$deliver`,
        method: "PUT",
        body: isDelivered,
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useGetAllOrdersQuery,
  useGetPaypalClientIdQuery,
  useCreateOrderMutation,
  useUpdateOrderToPaidMutation,
  useUpdateOrderToDeliveredMutation,
  useGetMyOrdersQuery,
} = ordersSliceApi as any;
