import { ReactNode } from "react";
import { PaginationProps } from "../Pagination/paginationTypes";

export type TableColumnWidth = "sm" | "md" | "lg";

export interface TableColumn<T> {
  id: keyof T;
  label: string;
  width?: TableColumnWidth;
  accessor?: (value: T[keyof T]) => ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  paginationData?: PaginationProps;
}
