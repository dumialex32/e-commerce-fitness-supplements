import React from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Pagination from "../components/pagination/Pagination";
import Product from "../components/Product/ProductCard";
import SideBar from "../components/SideBar";
import PageResults from "../components/PageResults";
import useProducts from "../hooks/useProducts";
import useErrorHandler from "../hooks/useErrorHandler";

const HomeScreen: React.FC = () => {
  const { data, isLoading, error, category, pageSize, setPageSize } =
    useProducts("homeScreenPageSize");
  const errorMessage = useErrorHandler(error);

  if (isLoading) return <Loader size="xl" />;

  if (errorMessage) return <Message>{errorMessage}</Message>;

  if (!data?.products || data.products.length === 0) {
    return <Message type="info">No products found.</Message>;
  }

  return (
    <div className="grid grid-cols-[18rem_1fr] h-full my-8 border-t">
      <SideBar>
        <PageResults data={data} category={category} />
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
