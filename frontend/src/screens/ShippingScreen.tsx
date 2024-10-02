import ShippingForm from "../components/ShippingForm";
import useCart from "../hooks/useCart";
import { hasEmptyValues } from "../utils/utils";

import CheckoutScreen from "./CheckoutScreen";

const ShippingScreen: React.FC = () => {
  const {
    cart: { shippingAddress, paymentMethod },
  } = useCart();

  return (
    <CheckoutScreen
      step1
      step2
      step3={!!paymentMethod}
      step4={
        (!hasEmptyValues(shippingAddress) && paymentMethod && true) || false
      }
    >
      <ShippingForm />
    </CheckoutScreen>
  );
};

export default ShippingScreen;
