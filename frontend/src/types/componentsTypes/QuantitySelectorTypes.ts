import { IProduct } from "../productsTypes/productTypes";

export interface IQuantitySelectorProps {
  product: IProduct;
  qty: number;
  onHandleSelectQty: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
