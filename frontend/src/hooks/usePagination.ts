import { useState } from "react";
import { getLocalStoragePaginationSetting } from "../utils/localStorageUtils";

const usePagination = (paginationKey: string) => {
  console.log(paginationKey);
  const [pageSize, setPageSize] = useState(() =>
    getLocalStoragePaginationSetting(paginationKey)
  );

  console.log("usePagination:", pageSize);

  return { pageSize, setPageSize };
};

export default usePagination;
