import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const renderFetchBaseQueryError = (
  error: FetchBaseQueryError | SerializedError | undefined
): string | null => {
  if (error) {
    if ("status" in error) {
      // handle FetchBaseQueryError
      const fetchBaseErrMsg: string =
        "data" in error && typeof error.data === "string"
          ? error.data
          : JSON.stringify(error.data);

      return fetchBaseErrMsg;
    } else {
      // handle SerializedError
      const serializedErrMsg: string | undefined =
        error.message ?? "An unknown error occurred";

      return serializedErrMsg;
    }
  }

  return null;
};
