import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ICartInitialState, ICartItem } from "../types/cartTypes/cartItemTypes";
import { addToCart, removeCartItem } from "../slices/cartSlice";
import { IProduct } from "../types/productsTypes/productTypes";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { hasEmptyValues } from "../utils/utils";

export const useCart = () => {
  const cart: ICartInitialState = useSelector((state: RootState) => state.cart);
  console.log(cart);

  const [qty, setQty] = useState<number>(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // add item to cart
  const handleAddToCart = (product: IProduct): void => {
    const cartItem: ICartItem = { ...product, qty };

    dispatch(addToCart(cartItem));
    navigate("/cart");
  };

  // remove item from cart
  const handleRemoveCartItem = (itemId: string): void => {
    dispatch(removeCartItem(itemId));
  };

  // set item quantity
  const handleSelectQty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQty(parseInt(e.target.value));
  };

  const handleCheckout = () => {
    navigate(
      `/login?redirect=${
        (hasEmptyValues(cart.shippingAddress) && "/shipping") ||
        (!cart.paymentMethod && "/payment") ||
        "/checkout"
      }`
    );
  };

  // change cart item quantity
  const handleChangeItemQty = (
    e: React.ChangeEvent<HTMLSelectElement>,
    item: ICartItem
  ) => {
    handleSelectQty(e);
    const newItem = { ...item, qty: +e.target.value };
    dispatch(addToCart(newItem));
  };

  // calculate total cart items
  const totalCartItems: number = cart.cartItems.reduce(
    (acc, item) => (acc = acc + item.qty),
    0
  );

  // calculate total cart items price
  const totalCartItemsPrice: number = cart.cartItems.reduce(
    (acc, item) => (acc = acc + item.price * item.qty),
    0
  );

  return {
    qty,
    totalCartItems,
    totalCartItemsPrice,
    cart,
    handleSelectQty,
    handleAddToCart,
    handleChangeItemQty,
    handleRemoveCartItem,
    handleCheckout,
  };
};

export default useCart;
