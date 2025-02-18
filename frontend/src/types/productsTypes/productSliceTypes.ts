import { Product as Product } from "./productTypes";

export interface ProductsData {
  products: Product[];
  pageCount: number;
  count: number;
}

// get product categories
export type GetProductCategoriesResponse = string[];

// get products types
export interface GetProductsResponse {
  products: Product[];
  count: number;
  pageCount: number;
}
export interface GetProductsProps {
  page?: number;
  pageSize?: number;
  category: string;
  searchKey: string;
}

// get product details querry types
export type GetProductDetailsResponse = Product;
export type GetProductDetailsProps = string;

// get top five rated products
export type GetTopFiveRatedProductsResponse = Product[];

// create product mutation
export type CreateProductProps = CreateEditProductPayload;
export interface CreateProductResponse {
  product: Product;
  message: string;
}

// upload product mutation
export interface UploadProductImageResponse {
  message: string;
  imagePath: string;
}

// upload product image types
export interface UploadProductImageResponse {
  message: string;
  imagePath: string;
}
export type UploadProductImageProps = FormData;

// delete product types
export interface DeleteProductResponse {
  message: string;
}
export type DeleteProductProps = string;

//edit product types
export interface CreateEditProductPayload {
  name: string;
  price: number;
  category: string;
  brand: string;
  countInStock: number;
  description: string;
  image: File | string;
}

export type EditProductResponse = {
  productUpdated: Product;
  message: string;
};
export interface EditProductProps {
  productId: string;
  patch: CreateEditProductPayload;
}

// create product review types
export interface CreateProductReviewProps {
  productId: string;
  comment: string;
  rating: number;
}
export interface CreateProductReviewResponse {
  message: string;
  product: Product;
}
