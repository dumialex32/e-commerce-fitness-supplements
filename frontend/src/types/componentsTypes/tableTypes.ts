import { ReactNode } from "react";

export interface TableColumn<T> {
  id: keyof T;
  label: string;
  accessor?: (value: T[keyof T]) => ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
}
