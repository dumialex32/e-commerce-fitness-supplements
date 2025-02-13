import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { DEFAULT_ERROR_MESSAGE } from "../constants";
import { renderFetchBaseQueryError } from "../utils/errorHelpers";
import { SerializedError } from "@reduxjs/toolkit";

const useErrorHandler = (
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  if (error) {
    const errorMessage =
      renderFetchBaseQueryError(error) || DEFAULT_ERROR_MESSAGE;

    return errorMessage;
  }

  return null;
};

export default useErrorHandler;
