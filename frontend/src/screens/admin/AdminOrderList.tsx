import Loader from "../../components/Loader";
import Message from "../../components/Message";
import OrderTable from "../../components/OrderTable";
import ScreenTitle from "../../components/ScreenTitle";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import { IuseGetOrdersQuery } from "../../types/orderTypes/orderSliceTypes";

import { renderFetchBaseQueryError } from "../../utils/errorHelpers";

const AdminOrderList: React.FC = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useGetOrdersQuery() as IuseGetOrdersQuery;

  if (isLoading) return <Loader />;

  if (error)
    return <Message type="error">{renderFetchBaseQueryError(error)}</Message>;

  if (!orders || orders.length === 0)
    return (
      <Message type="info">No orders have been placed by customers yet</Message>
    );

  return (
    <div>
      <ScreenTitle>Admin Profile</ScreenTitle>

      <OrderTable data={orders} />
    </div>
  );
};

export default AdminOrderList;
