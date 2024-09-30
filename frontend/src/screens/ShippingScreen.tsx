import ShippingForm from "../components/ShippingForm";
import usePayment from "../hooks/usePayment";

import CheckoutScreen from "./CheckoutScreen";

const ShippingScreen: React.FC = () => {
  const { paymentMethod } = usePayment();
  console.log(paymentMethod);
  return (
    <CheckoutScreen step1 step2 step3={paymentMethod ? true : false}>
      <ShippingForm />
    </CheckoutScreen>
  );
};

export default ShippingScreen;
