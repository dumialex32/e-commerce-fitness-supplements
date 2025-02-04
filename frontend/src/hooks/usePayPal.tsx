import { useEffect, useState } from "react";
import {
  useGetPaypalClientIdQuery,
  useUpdateOrderToPaidMutation,
} from "../slices/ordersApiSlice";
import { createToast } from "../utils/toastUtils";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import FormRow from "../components/FormRow";

const usePayPal = (
  orderId: string,
  totalPrice: number,
  onSuccess: () => void
) => {
  // state for setting the currency in which paypal processes the payment
  const [currency, setCurrency] = useState<string>("EUR");

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // mutation hook for updating the order status to paid
  const [payOrder, { isLoading: loadingPay }] = useUpdateOrderToPaidMutation();

  // query to fetch paypal client id from the server
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  // function to configure and load the paypal script with the client id and current currency state
  const loadPaypalScript = () => {
    paypalDispatch({
      type: "resetOptions",
      value: {
        "client-id": paypal.clientId,
        currency: currency,
      },
    });
    paypalDispatch({
      type: "setLoadingStatus",
      value: "pending",
    });
  };

  // effect to load or reload the paypal script when the component mounts or currency changes
  useEffect(() => {
    if (paypal?.clientId) {
      loadPaypalScript();
    }
  }, [currency, paypal, paypalDispatch]);

  // function to create a paypal order with the specified total price
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: totalPrice.toString(),
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  // function to handle successful payment capture from paypal
  function onApprove(data, actions) {
    // if the capture is successful, it resolves to a 'details' object containing payment details
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });

        // refetch data
        // onSuccess();

        createToast("Order successfully paid", { type: "success" });
      } catch (err: any) {
        console.error(err);
        createToast(err?.data?.message || err.message || "Order pay failed", {
          type: "error",
        });
      }
    });
  }

  // function to handle errors that occur during payment process
  function onError(err: any) {
    createToast(err.message, {
      type: "error",
    });
  }

  // function to set the currency in which paypal is processing the payment
  function handleCurrencyChange({
    target: { value },
  }: {
    target: { value: string };
  }) {
    setCurrency(value);
  }

  function renderPayPalButtons() {
    return (
      <div>
        <FormRow label="Payment Currency">
          <select value={currency} onChange={handleCurrencyChange}>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </FormRow>
        {paypal.clientId && (
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          />
        )}
      </div>
    );
  }

  return { loadingPay, isPending, renderPayPalButtons };
};

export default usePayPal;
