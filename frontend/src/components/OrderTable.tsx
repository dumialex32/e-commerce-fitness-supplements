import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { IOrderResponse } from "../types/Order/OrderTypes";
import { renderFetchBaseQueryError } from "../utils/errorHelpers";
import Loader from "./Loader";
import Message from "./Message";
import Table, { TableColumn } from "./Table";

interface IOrderApiSliceResponse {
  data: IOrderResponse[] | undefined;
  isLoading: boolean;
  error: unknown;
}

interface IOrderTableRow {
  orderNum: number;
  id: string;
  name: string;
  status: string;
  totalPrice: number;
}

const OrderTable: React.FC = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useGetMyOrdersQuery() as IOrderApiSliceResponse;

  const { userInfo } = useAuth();

  const columns: TableColumn<IOrderTableRow>[] = [
    { header: "", accessor: "orderNum" },
    {
      header: "Order ID",
      accessor: (item: IOrderTableRow) => (
        <Link to={`/order/${item.id}`} className="text-primary">
          {item.id}
        </Link>
      ),
    },
    { header: "Name", accessor: "name" },
    { header: "Status", accessor: "status" },
    {
      header: "Total",
      accessor: (item: IOrderTableRow) => `${item.totalPrice}€`,
    },
  ];

  const orderDataRow: IOrderTableRow[] =
    orders?.map((o, i) => ({
      orderNum: i + 1,
      id: o._id,
      name: userInfo?.name || "",
      status: o.isPaid ? "Paid" : "Not Paid",
      totalPrice: o.totalPrice,
    })) || [];

  if (isLoading) {
    return <Loader />;
  }
  if (error)
    return <Message type="error">{renderFetchBaseQueryError(error)}</Message>;

  return <Table columns={columns} data={orderDataRow} />;
};

export default OrderTable;
