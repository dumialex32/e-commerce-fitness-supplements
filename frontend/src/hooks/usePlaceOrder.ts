import { useEffect } from "react";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { IOrder } from "../types/Order/OrderTypes";
import { hasEmptyValues } from "../utils/utils";
import useCart from "./useCart";
import useAuth from "./useAuth";
import useAppNavigate from "./useAppNavigate";
import { useDispatch } from "react-redux";
import { clearCartItems } from "../slices/cartSlice";
import { createToast } from "../utils/toastUtils";

const usePlaceOrder = () => {
  const { userInfo } = useAuth();
  const { moveTo } = useAppNavigate();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const dispatch = useDispatch();

  const {
    cart: {
      cartItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      itemsPrice,
      shippingPrice,
      taxPrice,
    },
  } = useCart();

  const order: IOrder = {
    orderItems: cartItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    itemsPrice,
    shippingPrice,
    taxPrice,
  };

  useEffect(() => {
    if (hasEmptyValues(shippingAddress)) {
      moveTo("/shipping");
    } else if (!paymentMethod) {
      moveTo("/payment");
    }
  }, [shippingAddress, paymentMethod, cartItems]);

  const handlePlaceOrder = async (order: IOrder) => {
    try {
      const res = await createOrder(order).unwrap();
      dispatch(clearCartItems());
      createToast("Order successfully placed.", {
        type: "success",
        orientation: "bottom-center",
      });

      moveTo(`/order/${res._id}`);
    } catch (err) {
      console.error(err);
      createToast(err as string, { type: "error" });
    }
  };

  return {
    order,
    userInfo,
    shippingAddress,
    paymentMethod,
    cartItems,
    itemsPrice,
    totalPrice,
    taxPrice,
    shippingPrice,
    isLoading,
    error,
    handlePlaceOrder,
  };
};

export default usePlaceOrder;
