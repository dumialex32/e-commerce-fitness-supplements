import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import apiSlice from "./apiSlice";
import { IProduct, IProductPayload } from "../types/productsTypes/productTypes";

// Define the API slice with endpoints and types
const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: `${PRODUCTS_URL}`,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5000,
    }),

    getProductDetails: builder.query<IProduct, string>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5000,
    }),

    deleteProduct: builder.mutation<void, { productId: string }>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    editProduct: builder.mutation<
      IProduct,
      { productId: string; patch: IProductPayload }
    >({
      query: ({ productId, ...patch }) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Product"],
    }),

    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),

    createProduct: builder.mutation<void, IProductPayload>({
      query: (body) => ({
        url: PRODUCTS_URL,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useDeleteProductMutation,
  useEditProductMutation,
  useCreateProductMutation,
  useUploadProductImageMutation,
} = productApiSlice as any;
