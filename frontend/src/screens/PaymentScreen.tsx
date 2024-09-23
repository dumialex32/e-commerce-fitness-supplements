import { useEffect, useState } from "react";
import Form from "../components/Form";
import FormRow from "../components/FormRow";
import CheckoutScreen from "./CheckoutScreen";
import useAppNavigate from "../hooks/useAppNavigate";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { storePaymentMethod } from "../slices/cartSlice";

const PaymentScreen: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("paypal");
  const { shippingAddress } = useSelector((state: RootState) => state.cart);
  const { moveTo } = useAppNavigate();
  const dispatch = useDispatch();

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(storePaymentMethod(paymentMethod));
    moveTo("/placeholder");
  };

  useEffect(() => {
    if (!shippingAddress) {
      moveTo("/shipping");
    }
  }, [shippingAddress, moveTo]);

  return (
    <CheckoutScreen step1 step2 step3>
      <Form onSubmit={handlePaymentSubmit}>
        <FormRow direction="vertical" labelWithIcon="PayPal" error="">
          <input
            className=""
            type="radio"
            name="paymentMethod"
            value="paypal"
            id="paypal"
            onChange={(e) => setPaymentMethod(e.target.value)}
            checked={paymentMethod === "paypal"}
          />
        </FormRow>
        <FormRow direction="vertical" labelWithIcon="CreditCard" error="">
          <input
            className=""
            type="radio"
            name="paymentMethod"
            value="creditCard"
            id="creditCard"
            onChange={(e) => setPaymentMethod(e.target.value)}
            disabled
          />
        </FormRow>

        <button type="submit" className="btn btn-primary">
          Next
        </button>
      </Form>
    </CheckoutScreen>
  );
};

export default PaymentScreen;
