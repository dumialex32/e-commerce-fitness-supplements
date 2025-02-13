import { PAYPAL_URL } from "../constants";
import { ORDERS_URL } from "../constants";
import { PopulatedOrderResponse as PopulatedOrderData } from "../types/orderTypes/orderSliceTypes";
import { Order, OrderData } from "../types/orderTypes/OrderTypes";

import apiSlice from "./apiSlice";

// to do: add query types

const ordersSliceApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<OrderData[], void>({
      query: () => ({
        url: `${ORDERS_URL}/orders`,
      }),
      keepUnusedDataFor: 5000,
      providesTags: ["Order"],
    }),

    getOrderDetails: build.query<OrderData, string>({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5000,
      providesTags: ["Order"],
    }),

    getAllOrders: build.query<PopulatedOrderData[], void>({
      query: () => ({ url: ORDERS_URL }),
      keepUnusedDataFor: 5000,
    }),

    createOrder: build.mutation<OrderData, Order>({
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
      invalidatesTags: ["Order"],
    }),

    updateOrderToDelivered: build.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
      invalidatesTags: ["Order"],
    }),

    getPaypalClientId: build.query<{ clientId: string }, void>({
      query: () => ({ url: PAYPAL_URL, method: "GET" }),
      keepUnusedDataFor: 5000,
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetAllOrdersQuery,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  useCreateOrderMutation,
  useUpdateOrderToPaidMutation,
  useUpdateOrderToDeliveredMutation,
} = ordersSliceApi;
