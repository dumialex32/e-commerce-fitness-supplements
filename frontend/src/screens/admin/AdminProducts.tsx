import Loader from "../../components/Loader";
import Message from "../../components/Message";
import ScreenTitle from "../../components/ScreenTitle";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import ProductsTable from "../../components/Product/ProductsTable";
import CreateProduct from "../../components/Product/CreateProduct";
import useErrorHandler from "../../hooks/useErrorHandler";

const AdminProducts: React.FC = () => {
  const { data, isLoading, error } = useGetProductsQuery({});
  const errorMessage = useErrorHandler(error);
  // to do pagination

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
    </div>
  );
};

export default AdminProducts;
