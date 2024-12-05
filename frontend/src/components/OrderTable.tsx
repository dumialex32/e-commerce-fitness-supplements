import React from "react";
import { Link } from "react-router-dom";
import Table from "./Table";
import { getStatusIcon } from "../utils/tableUtils";
import { formatDate } from "../utils/formatters";
import {
  IOrderTableRow,
  IOrderTableProps,
  IUserProfileTableData,
} from "../types/orderTypes/orderTableTypes";
import { ITableColumn } from "../types/componentsTypes/tableTypes";
import { IPopulatedOrderResponse } from "../types/orderTypes/orderSliceTypes";

const OrderTable: React.FC<IOrderTableProps> = ({ data }) => {
  const columns: ITableColumn<IOrderTableRow>[] = [
    { id: "orderNum", label: "" },
    {
      id: "orderId",
      label: "Order ID",
      accessor: (value: string | number | boolean | undefined) => (
        <Link to={`/order/${value}`} className="text-primary">
          {value}
        </Link>
      ),
    },
    { id: "user", label: "User" },
    {
      id: "paidStatus",
      label: "Paid",
      accessor: (value: string | number | boolean | undefined | undefined) =>
        getStatusIcon(value as boolean),
    },
    {
      id: "deliveredStatus",
      label: "Delivered",
      accessor: (value: string | number | boolean | undefined) =>
        getStatusIcon(value as boolean),
    },
    {
      id: "totalPrice",
      label: "Total",
      accessor: (value: string | number | boolean | undefined) => `${value}€`,
    },
    {
      id: "date",
      label: "Date",
      accessor: (value: string | number | boolean | undefined) =>
        formatDate(value as string),
    },
  ];

  const orderDataRow: IOrderTableRow[] =
    data?.map((order, i) => {
      const isUserProfileData = (
        order: IUserProfileTableData | IPopulatedOrderResponse
      ): order is IUserProfileTableData => {
        return (order as IUserProfileTableData).currentUser !== undefined;
      };

      return {
        orderNum: i + 1,
        orderId: order._id,
        user: isUserProfileData(order) ? order.currentUser : order.user.name,
        paidStatus: order.isPaid,
        deliveredStatus: order.isDelivered,
        totalPrice: order.totalPrice,
        date: order.createdAt,
      };
    }) || [];

  return <Table columns={columns} data={orderDataRow} />;
};

export default OrderTable;
