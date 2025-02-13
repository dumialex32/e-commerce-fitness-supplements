import { OrderData } from "../orderTypes/OrderTypes";
import { QueryError } from "../Redux/QueryTypes";

// get all orders types
export interface PopulatedOrderResponse extends Omit<OrderData, "user"> {
  user: {
    _id: string;
    name: string;
  };
}

export interface UseGetAllOrdersQuery {
  data: PopulatedOrderResponse[];
  isLoading: boolean;
  error: QueryError;
}

export interface UseGetOrdersQuery {
  data: OrderData[];
  isLoading: boolean;
  error: QueryError;
}
