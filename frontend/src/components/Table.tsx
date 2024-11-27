import { TableProps } from "../types/componentsTypes/tableTypes";

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
                  console.log(value);
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
    </div>
  );
};

export default Table;
