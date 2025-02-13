import { Product } from "./productTypes";

export interface ProductsTableProps {
  data: Product[];
}

export interface ProductTableData {
  productId: string;
  name: string;
  price: number;
  category: string;
  brand: string;
}
