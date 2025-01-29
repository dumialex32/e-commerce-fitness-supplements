import RegisterForm from "../components/auth/RegisterForm";
import Loader from "../components/Loader";
import Message from "../components/Message";
import OrderTable from "../components/OrderTable";
import ScreenTitle from "../components/ScreenTitle";
import useAuth from "../hooks/useAuth";
import { useGetOrdersQuery } from "../slices/ordersApiSlice";
import { IuseGetOrdersQuery } from "../types/orderTypes/orderSliceTypes";
import { IUserProfileTableData } from "../types/orderTypes/orderTableTypes";
import { renderFetchBaseQueryError } from "../utils/errorHelpers";

const ProfileScreen: React.FC = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useGetOrdersQuery() as IuseGetOrdersQuery;

  const { userInfo } = useAuth();

  const profileTableOrders: IUserProfileTableData[] =
    orders?.map((order) => ({
      ...order,
      currentUser: userInfo?.name || "Unknown User",
    })) || [];

  const hasOrders = orders && orders.length > 0;

  if (isLoading) {
    return <Loader />;
  }

  if (error)
    return <Message type="error">{renderFetchBaseQueryError(error)}</Message>;

  if (!userInfo) return <Message type="info">User could not be found.</Message>;

  return (
    <div>
      <ScreenTitle>User Profile</ScreenTitle>

      <div className="grid grid-cols-[1fr_2fr] gap-6">
        <RegisterForm isUpdating={true} />

        {!hasOrders ? (
          <div>
            <Message type="info">
              No orders placed yet. Start shopping and create your first order!
            </Message>
          </div>
        ) : (
          <OrderTable data={profileTableOrders} />
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
