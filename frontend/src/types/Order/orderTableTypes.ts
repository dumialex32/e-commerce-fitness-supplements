import { IPopulatedOrderResponse } from "../slices/orderSliceTypes";
import { IOrderResponse } from "./OrderTypes";

export interface OrderTableRow {
  orderNum: number;
  orderId: string;
  user: string;
  paidStatus: boolean;
  deliveredStatus: boolean;
  totalPrice: number;
  date: string;
}

export interface IUserProfileTableData extends IOrderResponse {
  currentUser: string;
}

export interface OrderTableProps {
  data: IUserProfileTableData[] | IPopulatedOrderResponse[];
}
