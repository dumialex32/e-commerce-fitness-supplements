import RegisterForm from "../components/auth/RegisterForm";
import Loader from "../components/Loader";
import Message from "../components/Message";
import OrderTable from "../components/OrderTable";
import ScreenTitle from "../components/ScreenTitle";
import useAuth from "../hooks/useAuth";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { IUserProfileTableData } from "../types/Order/orderTableTypes";
import { IuseGetMyOrdersQuery } from "../types/slices/orderSliceTypes";
import { renderFetchBaseQueryError } from "../utils/errorHelpers";

const ProfileScreen: React.FC = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useGetMyOrdersQuery() as IuseGetMyOrdersQuery;
  console.log(orders);
  const { userInfo } = useAuth();

  const profileTableOrders: IUserProfileTableData[] =
    orders?.map((order) => ({
      ...order,
      currentUser: userInfo?.name || "Unknown User",
    })) || [];

  console.log(profileTableOrders);

  if (isLoading) {
    return <Loader />;
  }

  if (error)
    return <Message type="error">{renderFetchBaseQueryError(error)}</Message>;

  if (!orders || orders?.length === 0)
    return (
      <Message type="info">
        No orders placed yet. Start shopping and create your first order!
      </Message>
    );

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
