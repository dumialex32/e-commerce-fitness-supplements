import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import { ProductType } from "../types";

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get<ProductType[]>("/api/products");
        setProducts(data);
      } catch (err) {
        console.error("There was a problem while fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">Latest Products</h1>
      <ul className="flex flex-wrap">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default HomeScreen;
