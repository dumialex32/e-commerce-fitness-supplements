import { Order, OrderData } from "../orderTypes/OrderTypes";

// get all orders types
export interface PopulatedOrderResponse extends Omit<OrderData, "user"> {
  user: {
    _id: string;
    name: string;
  };
}

// get orders types
export type GetOrderResponse = OrderData[];

// get order details types
export type GetOrderDetailsResponse = OrderData;

// get all user orders types
export type GetAllOrdersResponse = PopulatedOrderResponse[];

// create order types
export type CreateOrderResponse = OrderData;
export type CreateOrderProps = Order;

// update order to paid types

export interface UpdateOrderToPaidProps {
  orderId: string;
  details: any;
}
export type UpdateOrderToPaidResponse = OrderData;

//update to delivered
export type UpdateOrderToDeliveredResponse = OrderData;
export type UpdateOrderToDeliveredProps = string;

// get paypal client id types
export interface GetPaypalClinedIdResponse {
  clientId: string;
}
