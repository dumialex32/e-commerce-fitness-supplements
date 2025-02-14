import Loader from "../../components/Loader";
import Message from "../../components/Message";
import ScreenTitle from "../../components/ScreenTitle";
import ProductsTable from "../../components/Product/ProductsTable";
import CreateProduct from "../../components/Product/CreateProduct";
import useErrorHandler from "../../hooks/useErrorHandler";
import useProducts from "../../hooks/useProducts";
import Pagination from "../../components/pagination/Pagination";

const AdminProducts: React.FC = () => {
  // to do pageSize state
  const { data, isLoading, error, pageSize, setPageSize } = useProducts(
    "productTablePageSize"
  );

  const errorMessage = useErrorHandler(error);
  // to do pagination
  console.log(data);

  if (isLoading) return <Loader />;
  if (errorMessage) return <Message type="error">{errorMessage}</Message>;
  if (!data)
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

      <ProductsTable data={data.products} />
      <Pagination
        size="sm"
        pageSize={pageSize}
        onSetPageSize={setPageSize}
        totalPages={data.pageCount}
        pageSizeStorageKey="productTablePageSize"
      />
    </div>
  );
};

export default AdminProducts;
