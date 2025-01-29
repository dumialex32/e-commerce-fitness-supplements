import { useMemo } from "react";
import { useGetOrdersQuery } from "../slices/ordersApiSlice";
import { IuseGetOrdersQuery } from "../types/orderTypes/orderSliceTypes";
import useAuth from "./useAuth";
import { useProduct } from "./useProduct";

const useProductScreen = () => {
  const { product, isLoading, error: productError } = useProduct();
  const { userInfo, isUserLoggedIn } = useAuth();
  const { data: orders } = useGetOrdersQuery() as IuseGetOrdersQuery;

  const hasUserAlreadyReviewedProduct = useMemo(
    () => product?.reviews?.some((rev) => rev.user === userInfo?.userId),
    [product?.reviews, userInfo]
  );

  const hasUserPurchasedProduct = useMemo(
    () =>
      orders?.some(
        (order) =>
          order.isPaid &&
          order.orderItems.some((o) => o.product === product?._id)
      ),
    [orders, product?._id]
  );

  return {
    hasUserAlreadyReviewedProduct,
    isLoading,
    productError,
    isUserLoggedIn,
    hasUserPurchasedProduct,
    product,
  };
};

export default useProductScreen;
