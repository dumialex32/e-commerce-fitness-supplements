import PaymentForm from "../components/cart/PaymentForm";

import CheckoutScreen from "./CheckoutScreen";

const PaymentScreen: React.FC = () => {
  return (
    <CheckoutScreen step1 step2 step3>
      <PaymentForm />
    </CheckoutScreen>
  );
};

export default PaymentScreen;
