import { IProduct } from "./productTypes";

export interface IProductsTableProps {
  data: IProduct[];
}

export interface IProductTableData {
  productId: string;
  name: string;
  price: number;
  category: string;
  brand: string;
}
