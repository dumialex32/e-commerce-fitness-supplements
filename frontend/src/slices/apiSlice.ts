import {
  BaseQueryFn,
  createApi,
  EndpointBuilder,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Product", "Order", "User"],
  endpoints: (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _builder: EndpointBuilder<
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      "Product" | "Order" | "User",
      "api"
    >
  ) => ({}),
});

export default apiSlice;
