import { ReactNode } from "react";

export interface ITableColumn<T> {
  id: keyof T;
  label: string;
  accessor?: (value: T[keyof T]) => ReactNode;
}

export interface ITableProps<T> {
  columns: ITableColumn<T>[];
  data: T[];
  className?: string;
}
