import PaymentForm from "../components/cart/PaymentForm";
import useCart from "../hooks/useCart";
import { hasEmptyValues } from "../utils/utils";

import CheckoutScreen from "./CheckoutScreen";

const PaymentScreen: React.FC = () => {
  const {
    cart: { shippingAddress, paymentMethod },
  } = useCart();

  return (
    <CheckoutScreen
      step1
      step2
      step3
      step4={
        (paymentMethod && !hasEmptyValues(shippingAddress) && true) || false
      }
    >
      <PaymentForm />
    </CheckoutScreen>
  );
};

export default PaymentScreen;
