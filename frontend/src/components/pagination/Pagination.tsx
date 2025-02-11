import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE_OPTIONS } from "../../constants";
import { setLocalStoragePaginationSettings } from "../../utils/localStorageUtils";

type Size = "sm" | "md" | "lg" | "xl" | "xxl";

const sizeMap: Record<
  Size,
  { text: string; arrow: string; w: string; h: string }
> = {
  sm: { text: "text-sm", arrow: "22", w: "w-6", h: "h-6" },
  md: { text: "text-md", arrow: "32", w: "w-8", h: "h-8" },
  lg: { text: "text-lg", arrow: "42", w: "w-10", h: "h-10" },
  xl: { text: "text-xl", arrow: "62", w: "w-14", h: "h-14" },
  xxl: { text: "text-2xl", arrow: "72", w: "w-14", h: "h-14" },
};

const Pagination: React.FC<{
  size: Size;
  totalPages: number;
  pageSize: number;
  isLoadingPages: boolean;
  pageSizeStorageKey: string;
  onSetPageSize: (value: number) => void;
}> = ({
  totalPages,
  size,
  pageSize,
  isLoadingPages,
  pageSizeStorageKey,
  onSetPageSize,
}) => {
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

  return (
    <div
      className={`flex items-center gap-4 ${
        sizeMap[size].text || sizeMap["md"].text
      }`}
    >
      <p className="text-xs">
        Page {currentPage} of {totalPages}
      </p>

      {/* prev button */}
      <button
        className={`${currentPage <= 1 && "opacity-0"}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isLoadingPages || currentPage === 1}
      >
        <MdKeyboardArrowLeft size={sizeMap[size].arrow} />
      </button>

      {/* pagination numbers */}
      <ul className="flex items-center gap-4">
        {getPagination().map((page, i) => (
          <button
            key={i}
            className={`${sizeMap[size].w} ${
              sizeMap[size].h
            } rounded-full transition-all duration-200 cursor-pointer ${
              currentPage === page
                ? "bg-primary text-white"
                : "bg-stone-100 hover:bg-primary hover:text-white"
            }`}
            onClick={() => handlePageChange(page)}
            disabled={isLoadingPages}
          >
            {page}
          </button>
        ))}
      </ul>

      {/* next button */}
      <button
        className={`${currentPage === totalPages && "opacity-0"}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLoadingPages || currentPage === totalPages}
      >
        <MdKeyboardArrowRight size={sizeMap[size].arrow} />
      </button>

      {/* page size selector */}
      <div className="flex items-center gap-2 text-xs">
        <label>Results per page</label>
        <select
          value={pageSize}
          onChange={handleSetPageSize}
          disabled={isLoadingPages}
        >
          {PAGE_SIZE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
