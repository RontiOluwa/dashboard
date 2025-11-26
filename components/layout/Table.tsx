import React from "react";

type TableProps = {
  column: string[];
  children: React.ReactNode;
};

function Table({ column, children }: TableProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {column.map((item, i) => (
                <th
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  key={i}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
