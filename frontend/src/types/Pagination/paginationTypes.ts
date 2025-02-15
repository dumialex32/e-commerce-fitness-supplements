export type Size = "sm" | "md" | "lg" | "xl" | "xxl";

export type PaginationSize = Record<
  Size,
  { text: string; arrow: string; w: string; h: string }
>;

export interface PaginationProps {
  size: Size;
  pages: (string | number)[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onSetPageSize: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onHandlePageChange: (newPage: number | string) => void;
}
