import React from "react";
import { Link } from "react-router-dom";
import Table from "./Table";
import { getStatusIcon } from "../utils/tableUtils";
import { formatDate } from "../utils/formatters";
import { OrderTableRow, OrderTableProps } from "../types/Order/orderTableTypes";
import { TableColumn } from "../types/componentsTypes/tableTypes";

const OrderTable: React.FC<OrderTableProps> = ({ data }) => {
  const columns: TableColumn<OrderTableRow>[] = [
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

  const orderDataRow: OrderTableRow[] =
    data?.map((order, i) => ({
      orderNum: i + 1,
      orderId: order._id,
      user: order.user.name || order.currentUser?.name || "unknown",
      paidStatus: order.isPaid,
      deliveredStatus: order.isDelivered,
      totalPrice: order.totalPrice,
      date: order.createdAt,
    })) || [];

  return <Table columns={columns} data={orderDataRow} />;
};

export default OrderTable;
