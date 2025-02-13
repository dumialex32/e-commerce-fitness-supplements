import { Product } from "./productTypes";

// ProductForm reducer types
export type ProductFormField =
  | "name"
  | "price"
  | "category"
  | "brand"
  | "description"
  | "countInStock"
  | "image";

export interface ProductFormErrors {
  name: string;
  price: string;
  category: string;
  brand: string;
  countInStock: string;
  description: string;
  image: string;
}

export interface ProductFormInitialState {
  name: string;
  price: number;
  category: string;
  brand: string;
  description: string;
  countInStock: number;
  image: File | string;
  errors: ProductFormErrors;
}

type SetProductFieldAction = {
  type: "SET_FIELD";
  payload: { field: ProductFormField; value: string | number | File | null };
};

type RemoveProductImageAction = { type: "REMOVE_PRODUCT_IMAGE" };

type SetErrorsAction = {
  type: "SET_ERRORS";
  payload: Partial<ProductFormErrors>;
};

export type ActionType =
  | SetProductFieldAction
  | RemoveProductImageAction
  | SetErrorsAction;

// useProductForm props
export interface IuseProductFormProps {
  product: Product;
  isEdit: boolean;
  onCloseModal: () => void;
}
