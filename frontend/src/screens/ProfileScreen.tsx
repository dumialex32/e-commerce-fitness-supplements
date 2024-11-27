import RegisterForm from "../components/auth/RegisterForm";
import Loader from "../components/Loader";
import Message from "../components/Message";
import OrderTable from "../components/OrderTable";
import ScreenTitle from "../components/ScreenTitle";
import useAuth from "../hooks/useAuth";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { IProfileOrderData } from "../types/Order/orderTableTypes";
import { IOrderResponse } from "../types/Order/OrderTypes";
import { renderFetchBaseQueryError } from "../utils/errorHelpers";

interface IOrderApiSliceResponse {
  data: IOrderResponse[] | undefined;
  isLoading: boolean;
  error: unknown;
}

const ProfileScreen: React.FC = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useGetMyOrdersQuery() as IOrderApiSliceResponse;
  console.log(orders);
  const { userInfo } = useAuth();

  const profileTableOrders: IProfileOrderData[] =
    orders?.map((order) => ({
      ...order,
      currentUser: userInfo,
    })) || [];

  console.log(profileTableOrders);

  if (isLoading) {
    return <Loader />;
  }

  if (error)
    return <Message type="error">{renderFetchBaseQueryError(error)}</Message>;

  if (!orders || orders?.length === 0)
    return <Message type="info">No orders were placed yet.</Message>;

  if (!userInfo) return <Message type="info">User could not be found.</Message>;

  return (
    <div>
      <ScreenTitle>User Profile</ScreenTitle>

      <div className="grid grid-cols-[1fr_2fr] gap-6">
        <RegisterForm isUpdating={true} />

        <OrderTable data={profileTableOrders} />
      </div>
    </div>
  );
};

export default ProfileScreen;
