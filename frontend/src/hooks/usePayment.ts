import { useEffect, useState } from "react";
import useAppNavigate from "../hooks/useAppNavigate";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { storePaymentMethod } from "../slices/cartSlice";

const usePayment = () => {
  const { paymentMethod: payment } = useSelector(
    (state: RootState) => state.cart
  );

  const [paymentMethod, setPaymentMethod] = useState<string>(
    payment || "paypal"
  );
  const { shippingAddress } = useSelector((state: RootState) => state.cart);
  const { moveTo } = useAppNavigate();
  const dispatch = useDispatch();

  const handlePaymentSubmit = (
    e: React.FormEvent,
    isEdit: boolean,
    closeModal: () => void
  ) => {
    e.preventDefault();
    dispatch(storePaymentMethod(paymentMethod));

    if (!isEdit) {
      moveTo("/checkout");
    } else {
      closeModal();
    }
  };

  useEffect(() => {
    if (!shippingAddress) {
      moveTo("/shipping");
    }
  }, [shippingAddress, moveTo]);

  return { paymentMethod, setPaymentMethod, handlePaymentSubmit };
};

export default usePayment;
