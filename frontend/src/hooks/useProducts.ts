import { useState } from "react";
import { DEFAULT_PAGE_SIZE } from "../constants";
import { getLocalStoragePaginationSetting } from "../utils/localStorageUtils";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const useProducts = () => {
  const [params] = useSearchParams();

  const page = Number(params.get("page")) || 1;
  const category = params.get("category") || "";
  const searchKey = params.get("k") || "";

  const [pageSize, setPageSize] = useState<number>(
    () =>
      getLocalStoragePaginationSetting("homeScreenPageSize") ||
      DEFAULT_PAGE_SIZE
  );

  const { data, isLoading, error } = useGetProductsQuery({
    page,
    category,
    pageSize,
    searchKey,
  });

  return {
    data,
    isLoading,
    error,
    page,
    category,
    searchKey,
    pageSize,
    setPageSize,
  };
};

export default useProducts;
