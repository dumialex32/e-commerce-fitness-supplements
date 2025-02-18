import { useParams } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  useUpdateOrderToDeliveredMutation,
} from "../slices/ordersApiSlice";

import useAppNavigate from "../hooks/useAppNavigate";
import useAuth from "../hooks/useAuth";
import usePayPal from "../hooks/usePayPal";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FlexRow from "../components/common/FlexRow";
import { IOrderItem } from "../types/orderTypes/OrderTypes";
import OrderItem from "../components/order/OrderItem";
import { formatDate, formatPriceCurrency } from "../utils/formatters";
import Logo from "../components/Logo";
import { createToast } from "../utils/toastUtils";
import useErrorHandler from "../hooks/useErrorHandler";

const OrderScreen: React.FC = () => {
  const { id } = useParams<string>();
  const orderId = id ?? "";

  const { moveTo } = useAppNavigate();
  const { userInfo } = useAuth();

  const {
    data: order,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId, { skip: !orderId });

  const errorMessage = useErrorHandler(error);

  // Fix: Provide default values for shippingAddress and its nested properties
  const {
    shippingAddress: {
      country = "",
      city = "",
      address = "",
      postalCode = "",
    } = {},
  } = order || {};

  const { loadingPay, isPending, renderPayPalButtons } = usePayPal(
    orderId as string,
    order?.totalPrice as number
  );

  const [updateOrderToDelivered, { isLoading: isLoadingUpdateToDelivered }] =
    useUpdateOrderToDeliveredMutation();

  const handleIsDelivered = async () => {
    try {
      const res = await updateOrderToDelivered(orderId).unwrap();
      console.log(res);
      createToast(res.message || "Order delivered", { type: "success" });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      createToast(err?.data?.message || err?.message, { type: "error" });
    }
  };

  if (isLoading) return <Loader />;
  if (errorMessage) return <Message type="error">{errorMessage}</Message>;
  if (!order) return <Message type="info">Order not found</Message>;

  return (
    <div className="flex flex-col gap-6 border-2 py-6 px-4">
      <h2 className="text-3xl text-center text-primary font-semibold">
        Order review
      </h2>

      <nav className="grid grid-cols-2 gap-6">
        <div className="grid gap-1 p-4 bg-gray-50 rounded-md text-gray-500 text-sm">
          <FlexRow>
            <p>Order</p>
            <p>6345673463465</p>
          </FlexRow>
          <FlexRow>
            <p>Order date</p>
            <p>{formatDate(order.createdAt)}</p>
          </FlexRow>
          <FlexRow>
            <p>Sold by</p>
            <p>MUSCLEDEV</p>
          </FlexRow>
        </div>

        <div className="justify-self-center">
          <Logo size="xl" />
        </div>

        <ul className="flex flex-col gap-2 p-4 shadow-md text-sm">
          <h2>Order Items</h2>
          {order.orderItems.map((oi: IOrderItem) => (
            <OrderItem key={oi._id} orderItem={oi} />
          ))}
        </ul>
      </nav>

      <div className="grid grid-cols-3 gap-9 p-4 max-w-cm-78">
        <div>
          <div className="divide-y-2">
            <h3 className="text-xl mb-2">Order Summary</h3>
            <div className="flex flex-col gap-2 py-4">
              <FlexRow>
                <p>
                  Subtotal{" "}
                  <span className="text-xs">
                    (x{order.orderItems.length}{" "}
                    {order.orderItems.length > 1 ? "items" : "item"})
                  </span>
                </p>
                <p>{formatPriceCurrency(order.itemsPrice)}</p>
              </FlexRow>
              <FlexRow>
                <p>Value shipping</p>
                <p>{formatPriceCurrency(order.shippingPrice)}</p>
              </FlexRow>
              <FlexRow>
                <p>Tax</p>
                <p>{formatPriceCurrency(order.taxPrice)}</p>
              </FlexRow>
            </div>
            <FlexRow>
              <p className="my-2 text-xl font-semibold text-primary">Total:</p>
              <p className="font-semibold">
                {formatPriceCurrency(order.totalPrice)}
              </p>
            </FlexRow>
            <div className="py-4">
              {!order.isPaid ? (
                <ul>
                  {loadingPay && <Loader />}
                  {isPending ? <Loader /> : <>{renderPayPalButtons()}</>}
                </ul>
              ) : (
                <button className="btn btn-primary" onClick={() => moveTo("/")}>
                  Go to Homepage
                </button>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="divide-y-2">
            <h3 className="text-xl mb-2">Payment</h3>
            <div className="flex flex-col gap-2 py-4">
              <FlexRow>
                <p>Payment</p>
                <p className="font-semibold">{order.paymentMethod}</p>
              </FlexRow>
              <Message type={order.isPaid ? "success" : "error"}>
                {order.isPaid && order.paidAt
                  ? `Paid on ${formatDate(order.paidAt)}`
                  : "Not Paid"}
              </Message>
            </div>
          </div>
        </div>
        <div>
          <div className="divide-y-2">
            <h3 className="text-xl pb-2">Shipping Address</h3>
            <div className="flex flex-col gap-2 py-4">
              <FlexRow>
                <p>
                  {country}, {city}, {address}, {postalCode}
                </p>
              </FlexRow>
              {isLoadingUpdateToDelivered ? (
                <Loader />
              ) : (
                <Message type={order.isDelivered ? "success" : "error"}>
                  {order.isDelivered && order.deliveredAt
                    ? `Delivered on ${formatDate(order.deliveredAt)}`
                    : "Not delivered"}
                </Message>
              )}

              {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
                <button
                  className="btn btn-primary self-start"
                  onClick={handleIsDelivered}
                >
                  Mark as delivered
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
