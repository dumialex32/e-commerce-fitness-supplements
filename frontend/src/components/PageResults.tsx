import { ProductsData } from "../types/productsTypes/productSliceTypes";

const PageResults: React.FC<{ data: ProductsData; category: string }> = ({
  data,
  category,
}) => {
  return (
    <div className="text-center">
      {data.products.length} of{" "}
      {data.count < 1000 ? data.count : "of more than 1000"} results{" "}
      {category && <span>for</span>}{" "}
      <span className="font-semibold text-primary">{category}</span>
    </div>
  );
};

export default PageResults;
