import { IOrderResponse } from "../Order/OrderTypes";

// get all orders types
export interface IPopulatedOrderResponse extends Omit<IOrderResponse, "user"> {
  user: {
    _id: string;
    name: string;
  };
}

export interface IuseGetOrdersQuery {
  data: IPopulatedOrderResponse[];
  isLoading: boolean;
  error: unknown;
}

export interface IuseGetMyOrdersQuery {
  data: IOrderResponse[];
  isLoading: boolean;
  error: unknown;
}
