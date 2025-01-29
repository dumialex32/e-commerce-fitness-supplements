import { IOrderResponse } from "../orderTypes/OrderTypes";

// get all orders types
export interface IPopulatedOrderResponse extends Omit<IOrderResponse, "user"> {
  user: {
    _id: string;
    name: string;
  };
}

export interface IuseGetAllOrdersQuery {
  data: IPopulatedOrderResponse[];
  isLoading: boolean;
  error: unknown;
}

export interface IuseGetOrdersQuery {
  data: IOrderResponse[];
  isLoading: boolean;
  error: unknown;
}
