import { useState } from "react";
import { getLocalStoragePaginationSetting } from "../utils/localStorageUtils";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { DEFAULT_PAGE_SIZE } from "../constants";

const useProducts = (paginationKey: string) => {
  const [params] = useSearchParams();

  const page = Number(params.get("page")) || 1;
  const category = params.get("category") || "";
  const searchKey = params.get("k") || "";

  const [pageSize, setPageSize] = useState(
    () => getLocalStoragePaginationSetting(paginationKey) || DEFAULT_PAGE_SIZE
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
    pageSize,
    setPageSize,
    category,

    searchKey,
  };
};

export default useProducts;
