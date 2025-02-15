import Loader from "../../components/Loader";
import Message from "../../components/Message";
import OrderTable from "../../components/OrderTable";
import ScreenTitle from "../../components/ScreenTitle";
import useErrorHandler from "../../hooks/useErrorHandler";
import { useGetAllOrdersQuery } from "../../slices/ordersApiSlice";

const AdminOrderList: React.FC = () => {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();

  const errorMessage = useErrorHandler(error);

  if (isLoading) return <Loader />;

  if (errorMessage) return <Message type="error">{errorMessage}</Message>;

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
