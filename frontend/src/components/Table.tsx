import {
  TableProps,
  TableColumnWidth,
} from "../types/componentsTypes/tableTypes";
import Pagination from "./pagination/Pagination";

const mapWidth: Record<TableColumnWidth, string> = {
  sm: "w-12",
  md: "w-14",
  lg: "w-24",
};

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
                className={`px-4 py-2 rounded-md bg-gray-100 text-left ${
                  mapWidth[col.width || "md"]
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            return (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((col, colIndex) => {
                  const value = row[col.id];

                  return (
                    <td key={colIndex} className="px-4 py-2 text-sm">
                      {col.accessor ? col.accessor(value) : String(value)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div className="px-4 py-2 rounded-md bg-gray-100 w-full">
        <Pagination
          size={size}
          totalPages={totalPages}
          pageSize={pageSize}
          pageSizeStorageKey={pageSizeStorageKey}
          onSetPageSize={onSetPageSize}
        />
      </div> */}
    </div>
  );
};

export default Table;
