import React from "react";

export interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
}

const Table = <T,>({
  columns,
  data,
  className,
}: TableProps<T>): JSX.Element => {
  if (data.length === 0) {
    return <p className="text-center text-gray-500">No data available.</p>;
  }

  return (
    <div className={`overflow-x-auto ${className || ""}`}>
      <table className="table-auto w-full rounded-md border-separate border border-gray-300">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-2 rounded-md bg-gray-100 text-left"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-2 text-sm">
                  {typeof col.accessor === "function"
                    ? col.accessor(item)
                    : (item[col.accessor as keyof T] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
