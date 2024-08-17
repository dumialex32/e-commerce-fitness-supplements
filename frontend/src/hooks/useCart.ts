import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ICartItem } from "../types/cart/cartItemTypes";
import { addToCart, removeCartItem } from "../slices/cartSlice";
import { IProduct } from "../types/products/productTypes";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useCart = () => {
  const [qty, setQty] = useState<number>(1);
  const { cartItems } = useSelector((state: RootState) => state.cart);

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
    navigate("/login?redirect=/shipping");
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
  const totalCartItems: number = cartItems.reduce(
    (acc, item) => (acc = acc + item.qty),
    0
  );

  // calculate total cart items price
  const totalCartItemsPrice: number = cartItems.reduce(
    (acc, item) => (acc = acc + item.price * item.qty),
    0
  );

  return {
    qty,
    handleSelectQty,
    handleAddToCart,
    handleChangeItemQty,
    totalCartItems,
    totalCartItemsPrice,
    handleRemoveCartItem,
    handleCheckout,
  };
};

export default useCart;
