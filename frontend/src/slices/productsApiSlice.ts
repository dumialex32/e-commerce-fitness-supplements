import { DEFAULT_PAGE_SIZE, PRODUCTS_URL, UPLOAD_URL } from "../constants";
import apiSlice from "./apiSlice";
import { Product, ProductPayload } from "../types/productsTypes/productTypes";
import {
  GetProductsQueryProps,
  ProductsData,
} from "../types/productsTypes/productQueryTypes";

// to do: add query types

// Define the API slice with endpoints and types
const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsData, GetProductsQueryProps>({
      query: ({
        page = 1,
        pageSize = DEFAULT_PAGE_SIZE,
        category,
        searchKey,
      }) => ({
        url: `${PRODUCTS_URL}`,
        params: { page, pageSize, category, searchKey },
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5000,
    }),

    getProductCategories: builder.query<string[], void>({
      query: () => ({
        url: `${PRODUCTS_URL}/categories`,
      }),
    }),

    getProductDetails: builder.query<Product, string>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5000,
      providesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<void, { productId: string }>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    editProduct: builder.mutation<
      Product,
      { productId: string; patch: ProductPayload }
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

    createProduct: builder.mutation<void, ProductPayload>({
      query: (body) => ({
        url: PRODUCTS_URL,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    createProductReview: builder.mutation({
      query: ({ productId, ...body }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductCategoriesQuery,
  useGetProductDetailsQuery,
  useDeleteProductMutation,
  useEditProductMutation,
  useCreateProductMutation,
  useUploadProductImageMutation,
  useCreateProductReviewMutation,
} = productApiSlice;
