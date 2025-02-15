import { useSearchParams } from "react-router-dom";
import { setLocalStoragePaginationSettings } from "../utils/localStorageUtils";

const usePagination = (
  totalPages: number,
  pageSizeStorageKey: string,
  onSetPageSize: (val: number) => void
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (newPage: number | string) => {
    if (typeof newPage === "number") {
      if (newPage < 1 || newPage > totalPages) return;
      searchParams.set("page", String(newPage));
      setSearchParams(searchParams);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const handleSetPageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSetPageSize(Number(e.target.value));
    setLocalStoragePaginationSettings(
      String(pageSizeStorageKey),
      e.target.value
    );
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const getPagination = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;
    const range = 2;

    // if total pages is less than or equal to the max visible pages
    // just return an array with all page numbers
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // for larger totalPages, build a truncated pagination list
    pages.push(1);

    if (currentPage > range + 2) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - range);
    const end = Math.min(totalPages - 1, currentPage + range);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - (range + 1)) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return {
    currentPage,
    pages: getPagination(),
    handlePageChange,
    handleSetPageSize,
  };
};

export default usePagination;
