import Loader from "../../components/Loader";
import Message from "../../components/Message";
import OrderTable from "../../components/OrderTable";
import ScreenTitle from "../../components/ScreenTitle";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import { IOrderResponse } from "../../types/Order/OrderTypes";
import { renderFetchBaseQueryError } from "../../utils/errorHelpers";

interface IGetOrdersResponse {
  data: IOrderResponse[];
  isLoading: boolean;
  error: unknown;
}

const AdminOrderList: React.FC = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useGetOrdersQuery() as IGetOrdersResponse;
  console.log(orders);

  if (isLoading) return <Loader />;

  if (error)
    return <Message type="error">{renderFetchBaseQueryError(error)}</Message>;

  return (
    <div>
      <ScreenTitle>Admin Profile</ScreenTitle>

      <OrderTable data={orders} />
    </div>
  );
};

export default AdminOrderList;
