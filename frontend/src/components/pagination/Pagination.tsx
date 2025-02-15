import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { PAGE_SIZE_OPTIONS } from "../../constants";
import {
  PaginationProps,
  PaginationSize,
} from "../../types/Pagination/paginationTypes";

const sizeMap: PaginationSize = {
  sm: { text: "text-sm", arrow: "22", w: "w-6", h: "h-6" },
  md: { text: "text-md", arrow: "32", w: "w-8", h: "h-8" },
  lg: { text: "text-lg", arrow: "42", w: "w-10", h: "h-10" },
  xl: { text: "text-xl", arrow: "62", w: "w-14", h: "h-14" },
  xxl: { text: "text-2xl", arrow: "72", w: "w-14", h: "h-14" },
};

const Pagination: React.FC<PaginationProps> = ({
  pages,
  size,
  currentPage,
  totalPages,
  pageSize,
  onSetPageSize,
  onHandlePageChange,
}) => {
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
        onClick={() => onHandlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdKeyboardArrowLeft size={sizeMap[size].arrow} />
      </button>

      {/* pagination numbers */}
      <ul className="flex items-center gap-4">
        {pages?.map((page, i) => (
          <button
            key={i}
            className={`${sizeMap[size].w} ${
              sizeMap[size].h
            } rounded-full transition-all duration-200 cursor-pointer ${
              currentPage === page
                ? "bg-primary text-white"
                : "bg-stone-100 hover:bg-primary hover:text-white"
            }`}
            onClick={() => onHandlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </ul>

      {/* next button */}
      <button
        className={`${currentPage === totalPages && "opacity-0"}`}
        onClick={() => onHandlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <MdKeyboardArrowRight size={sizeMap[size].arrow} />
      </button>

      {/* page size selector */}
      <div className="flex items-center gap-2 text-xs">
        <label>Results per page</label>
        <select value={pageSize} onChange={onSetPageSize}>
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
