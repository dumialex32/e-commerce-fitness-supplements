import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { UseGetProductDetailsQuery } from "../types/productsTypes/productSliceTypes";

export const useProduct = () => {
  const { id: productId } = useParams() as { id: string };

  const {
    data: product,
    isLoading,
    error,
  }: UseGetProductDetailsQuery = useGetProductDetailsQuery(productId);
  console.log(product);

  return { product, isLoading, error };
};
