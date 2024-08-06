import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ICartItem } from "../types/cart/cartItemTypes";
import { addToCart } from "../slices/cartSlice";
import { IProduct } from "../types/products/productTypes";

export const useCart = () => {
  const [qty, setQty] = useState<number>(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectQty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQty(parseInt(e.target.value));
  };

  const handleAddToCart = (product: IProduct): void => {
    const cartItem: ICartItem = { ...product, qty: qty };

    dispatch(addToCart(cartItem));
    navigate("/cart");
  };

  return { qty, handleSelectQty, handleAddToCart };
};

export default useCart;
