import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import FlexRow from "../components/common/FlexRow";
import Loader from "../components/Loader";
import { formatDate, formatPriceCurrency } from "../utils/formatters";
import Message from "../components/Message";
import useAppNavigate from "../hooks/useAppNavigate";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  useGetPaypalClientIdQuery,
  useUpdateOrderToPaidMutation,
} from "../slices/ordersApiSlice";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import OrderItem from "../components/order/OrderItem";
import { IOrderItem } from "../types/Order/OrderTypes";
import { createToast } from "../utils/toastUtils";

const OrderScreen: React.FC = () => {
  const { id: orderId } = useParams();

  const { moveBack, moveTo } = useAppNavigate();

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);
  console.log(order);

  const { shippingAddress: { country, city, address, postalCode } = {} } =
    order || {};

  // paypal states
  const [payOrder, { isLoading: loadingPay }] = useUpdateOrderToPaidMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypalSDK,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  console.log(paypalSDK);

  const { userInfo } = useAuth();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypalSDK?.clientId) {
      const loadPaypalScript = () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypalSDK.clientId,
            currency: "EUR",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };

      if (order && !order.isPaid && !window.paypal) {
        loadPaypalScript();
      }
    }
  }, [paypalSDK, paypalDispatch, errorPayPal, loadingPayPal, order]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        createToast("Order successfully paid", { type: "success" });
      } catch (err: any) {
        console.error(err);
        createToast(err?.data?.message || err.message || "Order pay failed", {
          type: "error",
        });
      }
    });
  }

  async function onApproveTest() {
    const res = await payOrder({
      orderId,
      details: {
        id: "1",
        status: "paid",
        updateTime: "test",
        payer: { email_address: "test@test.com" },
      },
    });

    console.log(res);
    refetch();
    createToast("Order successfully paid", { type: "success" });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice.toString(),
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  function onError(err: any) {
    createToast(err.message, {
      type: "error",
    });
  }

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

          <div className="grid gap-1 max-w-80 p-4 bg-gray-50 rounded-md text-gray-500 text-sm">
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

          <ul className="flex flex-col gap-2 p-4 shadow-md max-w-80 text-sm">
            <h2>Order Items</h2>
            {order.orderItems.map((oi: IOrderItem) => (
              <OrderItem key={oi._id} orderItem={oi} />
            ))}
          </ul>

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
                  {!order.isPaid && (
                    <ul>
                      {loadingPay && <Loader />}
                      {isPending ? (
                        <Loader />
                      ) : (
                        <>
                          <button className="btn" onClick={onApproveTest}>
                            Test Pay order
                          </button>
                          <div>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            />
                          </div>
                        </>
                      )}
                    </ul>
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
