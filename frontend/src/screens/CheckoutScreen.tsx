import { useLocation } from "react-router-dom";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import { ReactNode } from "react";
import Modal from "../components/Modal";
import ScreenTitle from "../components/ScreenTitle";

const CheckoutScreen: React.FC<{
  children: ReactNode;
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}> = ({ children, step1, step2, step3, step4 }) => {
  const location = useLocation();

  const pathname = location.pathname.split("/").pop() || "";
  const title = pathname.charAt(0).toUpperCase() + pathname.slice(1);

  return (
    <div className="container flex flex-col gap-8 items-center">
      <ScreenTitle>{title}</ScreenTitle>

      <CheckoutSteps step1={step1} step2={step2} step3={step3} step4={step4} />

      <div className="flex justify-center">
        <Modal>{children}</Modal>
      </div>
    </div>
  );
};

export default CheckoutScreen;
