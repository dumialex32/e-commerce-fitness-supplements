import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { IuseGetProductDetailsQuery } from "../types/productsTypes/productQueryTypes";

export const useProduct = () => {
  const { id: productId } = useParams() as { id: string };

  const {
    data: product,
    isLoading,
    error,
  }: IuseGetProductDetailsQuery = useGetProductDetailsQuery(productId);

  return { product, isLoading, error };
};
