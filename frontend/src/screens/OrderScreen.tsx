import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";

import useAppNavigate from "../hooks/useAppNavigate";

import useAuth from "../hooks/useAuth";
import usePayPal from "../hooks/usePayPal";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FlexRow from "../components/common/FlexRow";
import { IOrderItem, IOrderResponse } from "../types/Order/OrderTypes";
import OrderItem from "../components/order/OrderItem";
import { formatDate, formatPriceCurrency } from "../utils/formatters";
import Logo from "../components/Logo";

const OrderScreen: React.FC = () => {
  const { id: orderId } = useParams<string>();

  const { moveBack, moveTo } = useAppNavigate();

  const { userInfo } = useAuth();

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);
  console.log(order);

  const { shippingAddress: { country, city, address, postalCode } = {} } =
    order || {};

  const { loadingPay, isPending, renderPayPalButtons } = usePayPal(
    orderId as string,
    order?.totalPrice as number,
    refetch
  );

  // function to simulate the payment approval without paypal
  // async function onApproveTest() {
  //   const res = await payOrder({
  //     orderId,
  //     details: {
  //       id: "1",
  //       status: "paid",
  //       updateTime: "test",
  //       payer: { email_address: "test@test.com" },
  //     },
  //   });

  //   console.log(res);
  //   renderFetchBaseQueryError();
  //   createToast("Order successfully paid", { type: "success" });

  return (
    <>
      {isLoading && !error ? (
        <Loader />
      ) : !isLoading && error ? (
        <div className="flex flex-col items-start gap-4">
          <button className="btn btn-primary" onClick={() => moveBack()}>
            Go Back
          </button>
          <Message type="error">
            {error?.data?.message ||
              error?.data ||
              error?.message ||
              "An unknown error occured"}
          </Message>
        </div>
      ) : (
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
                  <p className="my-2 text-xl font-semibold text-primary">
                    Total:
                  </p>
                  <p className="font-semibold">
                    {formatPriceCurrency(order.totalPrice)}
                  </p>
                </FlexRow>
                <div className="py-4">
                  {!order.isPaid ? (
                    <ul>
                      {loadingPay && <Loader />}
                      {isPending ? (
                        <Loader />
                      ) : (
                        <>
                          {/* <button className="btn" onClick={onApproveTest}>
                            Test Pay order
                          </button> */}
                          {renderPayPalButtons()}
                        </>
                      )}
                    </ul>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => moveTo("/")}
                    >
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
                    {order.isPaid
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
                  <Message type={order.isDelivered ? "success" : "error"}>
                    {order.isDelivered ? "Delivred" : "Not delivered"}
                  </Message>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default OrderScreen;
