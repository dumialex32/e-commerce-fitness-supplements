import { PRODUCTS_URL } from "../constants";
import apiSlice from "./apiSlice";
import { IProduct } from "../types/products/productTypes";

// Define the API slice with endpoints and types
const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: `${PRODUCTS_URL}`,
      }),
      keepUnusedDataFor: 5000,
    }),
    getProductDetails: builder.query<IProduct, string>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5000,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productApiSlice as any;
