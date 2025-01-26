import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

//  render error messages from Redux Toolkit's createApi queries or mutations

export const renderFetchBaseQueryError = (
  error: FetchBaseQueryError | SerializedError | undefined
): string | null => {
  if (error) {
    console.error(error);
    if ("status" in error) {
      // Handle FetchBaseQueryError
      const fetchBaseErrMsg: string =
        "data" in error && typeof error.data === "string"
          ? error.data
          : JSON.stringify(error.data);

      return (
        fetchBaseErrMsg || "A network error occurred. Please try again later."
      );
    } else {
      // Handle SerializedError
      const serializedErrMsg: string | undefined =
        error.message ?? "An unknown error occurred. Please try again later.";

      return serializedErrMsg;
    }
  }

  return "An unknown error occurred. Please try again later.";
};
