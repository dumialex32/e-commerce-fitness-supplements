import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { DEFAULT_ERROR_MESSAGE } from "../constants";

//  render error messages from Redux Toolkit's createApi queries or mutations
export const renderFetchBaseQueryError = (
  error: FetchBaseQueryError | SerializedError | undefined
): string => {
  if (!error) {
    return DEFAULT_ERROR_MESSAGE;
  }

  // handle FetchBaseQueryError (network or response-related errors)
  if ("status" in error) {
    const fetchBaseErrMsg: string =
      error.data && typeof error.data === "string"
        ? error.data
        : JSON.stringify(error.data) ||
          "A network error occurred. Please try again later.";

    return fetchBaseErrMsg;
  }

  // handle SerializedError (internal errors or validation errors)
  if ("message" in error) {
    return error.message ?? DEFAULT_ERROR_MESSAGE;
  }

  return DEFAULT_ERROR_MESSAGE;
};
