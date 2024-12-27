import Loader from "../../components/Loader";
import Message from "../../components/Message";
import ScreenTitle from "../../components/ScreenTitle";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { renderFetchBaseQueryError } from "../../utils/errorHelpers";
import ProductsTable from "../../components/Product/ProductsTable";
import CreateProduct from "../../components/Product/CreateProduct";
import { IuseGetProductsQuery } from "../../types/productsTypes/productQueryTypes";

const AdminProducts: React.FC = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery() as IuseGetProductsQuery;

  if (isLoading) return <Loader />;
  if (error)
    return <Message type="error">{renderFetchBaseQueryError(error)}</Message>;

  return (
    <div>
      <div className="flex justify-between items-center gap-2 ">
        <ScreenTitle>Products</ScreenTitle>
        <CreateProduct />
      </div>

      <ProductsTable data={products} />
    </div>
  );
};

export default AdminProducts;
