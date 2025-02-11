import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IProduct } from "./productTypes";
import { SerializedError } from "@reduxjs/toolkit";

/**
 * Interface repseresing the state of useGetProductsQuery hook
 * @interface IuseGetProductsQuery
 *
 * @property {IProduct} data - the data type returned from the query
 * @property {boolean} isLoading - boolean flag indicating the loading state
 * @property {FetchBaseQueryError | SerializedError | undefined} error - the type of encountered error during fetch or undefined if no error
 **/

export interface IuseGetProductsQuery {
  data: {
    products: IProduct[];
    pageCount: number;
    count: number;
    productCategories: string[];
  };
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

/**
 * Interface representing the state of useGetProductDetailQuery hook
 * @interface IuseGetProductDetailsQuery
 *
 * @property {IProduct} data - the data type returned from the query state
 * @property {isLoading} isLoading - boolean flag representing the loading state
 * @property {FetchBaseQueryError | SerializedError | undefined} error - the type of error encountered during fetch or undefined if there is no error
 */
export interface IuseGetProductDetailsQuery {
  data: IProduct;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}
