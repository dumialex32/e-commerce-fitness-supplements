import { PAYPAL_URL } from "../constants";
import { ORDERS_URL } from "../constants";
import { IOrder, IOrderResponse } from "../types/orderTypes/OrderTypes";
import { IPopulatedOrderResponse } from "../types/slices/orderSliceTypes";
import apiSlice from "./apiSlice";

const ordersSliceApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMyOrders: build.query<IOrderResponse, void>({
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
      providesTags: ["Order"],
    }),

    getOrders: build.query<IPopulatedOrderResponse[], void>({
      query: () => ({ url: ORDERS_URL }),
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
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  useCreateOrderMutation,
  useUpdateOrderToPaidMutation,
  useUpdateOrderToDeliveredMutation,
  useGetMyOrdersQuery,
} = ordersSliceApi as any;
