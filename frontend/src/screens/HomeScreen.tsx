import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { IuseGetProductsQuery } from "../types/productsTypes/productQueryTypes";
import { renderFetchBaseQueryError } from "../utils/errorHelpers";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { DEFAULT_ERROR_MESSAGE, DEFAULT_PAGE_SIZE } from "../constants";
import Pagination from "../components/pagination/Pagination";
import Product from "../components/Product/ProductCard";
import { getLocalStoragePaginationSetting } from "../utils/localStorageUtils";
import SideBar from "../components/SideBar";

const HomeScreen: React.FC = () => {
  const [params] = useSearchParams();

  const page = Number(params.get("page")) || 1;
  const category = params.get("category") || "";

  const [pageSize, setPageSize] = useState<number>(
    () =>
      getLocalStoragePaginationSetting("homeScreenPageSize") ||
      DEFAULT_PAGE_SIZE
  );

  const { data, isLoading, error }: IuseGetProductsQuery = useGetProductsQuery({
    page,
    category,
    pageSize,
  });

  if (isLoading) return <Loader size="xl" />;

  if (error) {
    const errorMessage =
      renderFetchBaseQueryError(error) || DEFAULT_ERROR_MESSAGE;
    return <Message type="error">{errorMessage}</Message>;
  }

  if (!data?.products || data.products.length === 0) {
    return <Message type="info">No products found.</Message>;
  }

  return (
    <div className="grid grid-cols-[16rem_1fr] h-full my-8 border-t">
      <SideBar>
        <div>
          {data.products.length} of{" "}
          {data.count < 1000 ? data.count : "of more than 1000"} results in
        </div>
      </SideBar>

      <div className="flex flex-col gap-6">
        <ul className="flex flex-wrap">
          {data.products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </ul>

        <div className="self-center">
          <Pagination
            totalPages={data.pageCount}
            isLoadingPages={isLoading}
            pageSize={pageSize}
            onSetPageSize={setPageSize}
            pageSizeStorageKey="homeScreenPageSize"
            size="md"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
