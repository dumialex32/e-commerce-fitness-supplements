import products, { ProductType } from "../products";
import Product from "../components/Product";

const HomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">Latest Products</h1>

      <ul className="flex flex-wrap ">
        {products.map((product: ProductType) => {
          return <Product key={product.id} product={product} />;
        })}
      </ul>
    </div>
  );
};

export default HomeScreen;
