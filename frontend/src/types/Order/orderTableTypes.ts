import { IUserInfo } from "../userTypes/authSliceTypes";
import { IOrderResponse } from "./OrderTypes";

export interface OrderTableRow {
  orderNum: number;
  orderId: string;
  user: string | undefined;
  paidStatus: boolean;
  deliveredStatus: boolean;
  totalPrice: number;
  date: string;
}

export interface OrderTableProps {
  data: IProfileOrderData[];
}

export interface IProfileOrderData extends IOrderResponse {
  currentUser?: IUserInfo | null;
}
