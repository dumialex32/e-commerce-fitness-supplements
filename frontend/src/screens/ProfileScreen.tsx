import { useMemo } from "react";
import RegisterForm from "../components/auth/RegisterForm";
import Loader from "../components/Loader";
import Message from "../components/Message";
import OrderTable from "../components/OrderTable";
import ScreenTitle from "../components/ScreenTitle";
import useAuth from "../hooks/useAuth";
import useErrorHandler from "../hooks/useErrorHandler";
import { useGetOrdersQuery } from "../slices/ordersApiSlice";

import { UserProfileTableData } from "../types/orderTypes/orderTableTypes";

const ProfileScreen: React.FC = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log(orders);

  const errorMessage = useErrorHandler(error);

  const { userInfo } = useAuth();

  const profileTableOrders: UserProfileTableData[] = useMemo(() => {
    return (
      orders?.map((order) => ({
        ...order,
        currentUser: userInfo?.name || "Unknown User",
      })) || []
    );
  }, [userInfo?.name, orders]);

  const hasOrders = orders && orders.length > 0;

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) return <Message type="error">{errorMessage}</Message>;
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
