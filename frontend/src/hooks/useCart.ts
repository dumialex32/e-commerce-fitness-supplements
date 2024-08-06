import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ICartItem } from "../types/cart/cartItemTypes";
import { addToCart } from "../slices/cartSlice";
import { IProduct } from "../types/products/productTypes";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useCart = () => {
  const [qty, setQty] = useState<number>(1);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  console.log(qty);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectQty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQty(parseInt(e.target.value));
  };

  const handleAddToCart = (product: IProduct): void => {
    console.log(product, qty);
    const cartItem: ICartItem = { ...product, qty };

    dispatch(addToCart(cartItem));
    navigate("/cart");
  };

  const totalCartItems: number = cartItems.reduce(
    (acc, item) => (acc = acc + item.qty),
    0
  );

  return { qty, handleSelectQty, handleAddToCart, totalCartItems };
};

export default useCart;
