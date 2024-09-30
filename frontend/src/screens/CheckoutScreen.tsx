import { useLocation } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { ReactNode } from "react";
import Modal from "../components/Modal";

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
    <div className="container flex flex-col gap-12 items-center">
      <h1 className="text-4xl font-semibold text-primary">{title}</h1>

      <CheckoutSteps step1={step1} step2={step2} step3={step3} step4={step4} />

      <div className="flex justify-center">
        <Modal>{children}</Modal>
      </div>
    </div>
  );
};

export default CheckoutScreen;
