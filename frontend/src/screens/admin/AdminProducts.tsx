import Loader from "../../components/Loader";
import Message from "../../components/Message";
import ScreenTitle from "../../components/ScreenTitle";
import ProductsTable from "../../components/Product/ProductsTable";
import CreateProduct from "../../components/Product/CreateProduct";
import useErrorHandler from "../../hooks/useErrorHandler";
import useProducts from "../../hooks/useProducts";

const AdminProducts: React.FC = () => {
  const {
    products,
    totalPages,
    pages,
    currentPage,
    isLoading,
    error,
    pageSize,
    handlePageChange,
    handleSetPageSize,
  } = useProducts("productTablePageSize");

  const errorMessage = useErrorHandler(error);

  if (isLoading) return <Loader />;
  if (errorMessage) return <Message type="error">{errorMessage}</Message>;
  if (!products || products.length === 0)
    return (
      <Message type="info">
        No products available. You can start create products by clicking on
        create products.
      </Message>
    );

  return (
    <div>
      <div className="flex justify-between items-center gap-2 ">
        <ScreenTitle>Products</ScreenTitle>
        <CreateProduct />
      </div>

      <ProductsTable
        data={products}
        paginationData={{
          size: "sm",
          pages,
          currentPage,
          pageSize,
          totalPages,
          onHandlePageChange: handlePageChange,
          onSetPageSize: handleSetPageSize,
        }}
      />
    </div>
  );
};

export default AdminProducts;
