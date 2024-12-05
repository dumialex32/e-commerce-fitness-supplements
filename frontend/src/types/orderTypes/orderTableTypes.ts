import { IPopulatedOrderResponse } from "./orderSliceTypes";
import { IOrderResponse } from "./OrderTypes";

export interface IOrderTableRow {
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

export interface IOrderTableProps {
  data: IUserProfileTableData[] | IPopulatedOrderResponse[];
}
