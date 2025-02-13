import { PAYPAL_URL } from "../constants";
import { ORDERS_URL } from "../constants";
import {
  CreateOrderProps,
  CreateOrderResponse,
  GetAllOrdersResponse,
  GetOrderDetailsResponse,
  GetOrderResponse,
  GetPaypalClinedIdResponse,
  PopulatedOrderResponse as UpdateOrderToDeliveredProps,
  UpdateOrderToDeliveredResponse,
  UpdateOrderToPaidProps,
  UpdateOrderToPaidResponse,
} from "../types/orderTypes/orderSliceTypes";

import apiSlice from "./apiSlice";

// to do: add query types

const ordersSliceApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<GetOrderResponse, void>({
      query: () => ({
        url: `${ORDERS_URL}/orders`,
      }),
      keepUnusedDataFor: 5000,
      providesTags: ["Order"],
    }),

    getOrderDetails: build.query<GetOrderDetailsResponse, string>({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5000,
      providesTags: ["Order"],
    }),

    getAllOrders: build.query<GetAllOrdersResponse, void>({
      query: () => ({ url: ORDERS_URL }),
      keepUnusedDataFor: 5000,
    }),

    createOrder: build.mutation<CreateOrderResponse, CreateOrderProps>({
      query: (order) => ({
        url: `${ORDERS_URL}`,
        method: "POST",
        body: { ...order },
      }),
      invalidatesTags: ["Order"],
    }),

    updateOrderToPaid: build.mutation<
      UpdateOrderToPaidResponse,
      UpdateOrderToPaidProps
    >({
      query: ({ orderId, ...details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
      invalidatesTags: ["Order"],
    }),

    updateOrderToDelivered: build.mutation<
      UpdateOrderToDeliveredResponse,
      UpdateOrderToDeliveredProps
    >({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
      invalidatesTags: ["Order"],
    }),

    getPaypalClientId: build.query<GetPaypalClinedIdResponse, void>({
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
