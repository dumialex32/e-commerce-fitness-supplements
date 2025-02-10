import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { DEFAULT_ERROR_MESSAGE } from "../constants";

// Render error messages from Redux Toolkit's createApi queries or mutations
export const renderFetchBaseQueryError = (
  error: FetchBaseQueryError | SerializedError | undefined
): string => {
  if (!error) {
    return DEFAULT_ERROR_MESSAGE;
  }

  console.error("Error:", error);

  // handle FetchBaseQueryError (network or response-related errors)
  if ("status" in error) {
    if (
      error.data &&
      typeof error.data === "object" &&
      "message" in error.data
    ) {
      return String(error.data.message);
    }

    return "A network error occurred. Please try again later.";
  }

  // handle SerializedError (internal errors or validation errors)
  if ("message" in error) {
    return error.message ?? DEFAULT_ERROR_MESSAGE;
  }

  return DEFAULT_ERROR_MESSAGE;
};
