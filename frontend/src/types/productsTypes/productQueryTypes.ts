import { Product as Product } from "./productTypes";
import { QueryError } from "../Redux/QueryTypes";

export interface ProductsData {
  products: Product[];
  pageCount: number;
  count: number;
}

export interface UseGetProductsQuery {
  data: ProductsData;
  isLoading: boolean;
  error: QueryError;
}

export interface GetProductsQueryProps {
  page?: number;
  pageSize?: number;
  category: string;
  searchKey: string;
}

export interface UseGetProductDetailsQuery {
  data: Product;
  isLoading: boolean;
  error: QueryError;
}
