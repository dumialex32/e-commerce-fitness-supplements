import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

export const useProduct = () => {
  const { id: productId } = useParams() as { id: string };

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  return { product, isLoading, error };
};
