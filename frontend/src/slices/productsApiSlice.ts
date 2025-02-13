import { DEFAULT_PAGE_SIZE, PRODUCTS_URL, UPLOAD_URL } from "../constants";
import apiSlice from "./apiSlice";
import {
  CreateProductResponse,
  DeleteProductProps,
  DeleteProductResponse,
  EditProductProps,
  EditProductResponse,
  GetProductCategoriesResponse,
  GetProductDetailsProps,
  GetProductDetailsResponse,
  GetProductsProps,
  GetProductsResponse,
  UploadProductImageResponse,
  CreateProductProps,
  UploadProductImageProps,
  CreateProductReviewProps,
  CreateProductReviewResponse,
} from "../types/productsTypes/productSliceTypes";

// Define the API slice with endpoints and types
const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, GetProductsProps>({
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

    getProductCategories: builder.query<GetProductCategoriesResponse, void>({
      query: () => ({
        url: `${PRODUCTS_URL}/categories`,
      }),
    }),

    getProductDetails: builder.query<
      GetProductDetailsResponse,
      GetProductDetailsProps
    >({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5000,
      providesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<DeleteProductResponse, DeleteProductProps>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    editProduct: builder.mutation<EditProductResponse, EditProductProps>({
      query: ({ productId, ...patch }) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Product"],
    }),

    uploadProductImage: builder.mutation<
      UploadProductImageResponse,
      UploadProductImageProps
    >({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),

    createProduct: builder.mutation<CreateProductResponse, CreateProductProps>({
      query: (body) => ({
        url: PRODUCTS_URL,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    createProductReview: builder.mutation<
      CreateProductReviewResponse,
      CreateProductReviewProps
    >({
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
