import { ORDERS_URL } from "../constants";
import apiSlice from "./apiSlice";

const ordersSliceApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMyOrders: build.query({
      query: () => ({
        url: `${ORDERS_URL}/getMyOrders`,
      }),
      keepUnusedDataFor: 5000,
    }),

    getOrderById: build.query({
      query: () => ({
        url: `${ORDERS_URL}/getMyOrders`,
      }),
      keepUnusedDataFor: 5000,
    }),

    getOrders: build.query({
      query: (id: string) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5000,
    }),

    createOrder: build.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}`,
        method: "POST",
        body: { ...order },
      }),
    }),

    updateOrderToPaid: build.mutation({
      query: ({ id, isPaid }: { id: string; isPaid: boolean }) => ({
        url: `${ORDERS_URL}/${id}/pay`,
        method: "PUT",
        body: isPaid,
      }),
    }),

    updateOrderToDelivered: build.mutation({
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
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useUpdateOrderToPaidQuery,
  useUpdateOrderToDeliveredQuery,
} = ordersSliceApi as any;
