import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const renderFetchBaseQueryError = (
  error: FetchBaseQueryError | SerializedError | undefined
): string | null => {
  if (error) {
    if ("status" in error) {
      // handle FetchBaseQueryError
      const fetchBaseErrMsg: string =
        "error" in error ? error.error : JSON.stringify(error.data);

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
