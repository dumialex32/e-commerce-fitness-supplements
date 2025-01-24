import { IProduct } from "./productTypes";

// ProductForm reducer types
export type ProductFormField =
  | "name"
  | "price"
  | "category"
  | "brand"
  | "description"
  | "countInStock"
  | "image";

export interface IErrors {
  name: string;
  price: string;
  category: string;
  brand: string;
  countInStock: string;
  description: string;
  image: string;
}

export interface IInitialState {
  name: string;
  price: number;
  category: string;
  brand: string;
  description: string;
  countInStock: number;
  image: File | string;
  errors: IErrors;
}

type SetProductFieldAction = {
  type: "SET_FIELD";
  payload: { field: ProductFormField; value: string | number | File | null };
};

type RemoveProductImageAction = { type: "REMOVE_PRODUCT_IMAGE" };

type SetErrorsAction = { type: "SET_ERRORS"; payload: Partial<IErrors> };

export type ActionType =
  | SetProductFieldAction
  | RemoveProductImageAction
  | SetErrorsAction;

// useProductForm props
export interface IuseProductFormProps {
  product: IProduct;
  isEdit: boolean;
  onCloseModal: () => void;
}
