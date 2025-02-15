import { PaginationProps } from "../Pagination/paginationTypes";
import { Product } from "./productTypes";

export interface ProductsTableProps {
  data: Product[];
  paginationData: PaginationProps;
}

export interface ProductTableData {
  productId: string;
  name: string;
  price: number;
  category: string;
  brand: string;
}
