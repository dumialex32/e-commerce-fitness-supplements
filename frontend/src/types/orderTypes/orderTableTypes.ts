import { PopulatedOrderResponse } from "./orderSliceTypes";
import { OrderData as OrderData } from "./OrderTypes";

export interface OrderTableRow {
  orderNum: number;
  orderId: string;
  user: string;
  paidStatus: boolean;
  deliveredStatus: boolean;
  totalPrice: number;
  date: string;
}

export interface UserProfileTableData extends OrderData {
  currentUser: string;
}

export interface OrderTableProps {
  data: UserProfileTableData[] | PopulatedOrderResponse[];
}
