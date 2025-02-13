import { Product as Product } from "../productsTypes/productTypes";

export interface QuantitySelectorProps {
  product: Product;
  qty: number;
  onHandleSelectQty: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
