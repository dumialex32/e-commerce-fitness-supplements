import { useState } from "react";
import { getLocalStoragePaginationSetting } from "../utils/localStorageUtils";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { DEFAULT_PAGE_SIZE } from "../constants";
import usePagination from "./usePagination";

const useProducts = (paginationKey: string) => {
  const [params] = useSearchParams();

  const category = params.get("category") || "";
  const searchKey = params.get("k") || "";
  const page = Number(params.get("page")) || 1;

  const [pageSize, setPageSize] = useState<number>(
    () => getLocalStoragePaginationSetting(paginationKey) || DEFAULT_PAGE_SIZE
  );

  const { data, isLoading, error } = useGetProductsQuery({
    page,
    category,
    pageSize,
    searchKey,
  });

  const products = data?.products || [];
  const totalPages = data?.pageCount ?? 0;
  const count = data?.count ?? 0;

  const { pages, currentPage, handlePageChange, handleSetPageSize } =
    usePagination(totalPages, paginationKey, setPageSize);

  return {
    products,
    count,
    totalPages,
    pages,
    currentPage,
    isLoading,
    error,
    pageSize,
    category,
    searchKey,
    handlePageChange,
    handleSetPageSize,
  };
};

export default useProducts;
