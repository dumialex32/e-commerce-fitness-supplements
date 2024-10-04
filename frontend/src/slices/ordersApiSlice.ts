import { ORDERS_URL } from "../constants";
import { IOrder, IOrderResponse } from "../types/Order/OrderTypes";
import apiSlice from "./apiSlice";

const ordersSliceApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMyOrders: build.query<IOrder[], void>({
      query: () => ({
        url: `${ORDERS_URL}/getMyOrders`,
      }),
      keepUnusedDataFor: 5000,
    }),

    getOrderById: build.query<IOrderResponse, string>({
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
    }),

    updateOrderToPaid: build.mutation<
      IOrderResponse,
      { id: string; isPaid: boolean }
    >({
      query: ({ id, isPaid }) => ({
        url: `${ORDERS_URL}/${id}/pay`,
        method: "PUT",
        body: isPaid,
      }),
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
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderToPaidMutation,
  useUpdateOrderToDeliveredMutation,
} = ordersSliceApi as any;
