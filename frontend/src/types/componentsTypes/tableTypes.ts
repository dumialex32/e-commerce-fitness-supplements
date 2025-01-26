import { ReactNode } from "react";

export type TableColumnWidth = "sm" | "md" | "lg";

export interface ITableColumn<T> {
  id: keyof T;
  label: string;
  width?: TableColumnWidth;
  accessor?: (value: T[keyof T]) => ReactNode;
}

export interface ITableProps<T> {
  columns: ITableColumn<T>[];
  data: T[];
  className?: string;
}
