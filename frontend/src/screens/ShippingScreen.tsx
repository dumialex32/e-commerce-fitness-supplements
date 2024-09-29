import ShippingForm from "../components/ShippingForm";

import CheckoutScreen from "./CheckoutScreen";

const ShippingScreen: React.FC = () => {
  return (
    <CheckoutScreen step1 step2 step3={true ? true : false}>
      <ShippingForm />
    </CheckoutScreen>
  );
};

export default ShippingScreen;
