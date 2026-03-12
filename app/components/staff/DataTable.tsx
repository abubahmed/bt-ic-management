interface DataTableProps {
  headers: readonly string[];
  rows: Record<string, string>[];
  onRemove?: (index: number) => void;
}

export default function DataTable({ headers, rows, onRemove }: DataTableProps) {
  return (
    <div className="mt-8 overflow-x-auto border border-[#eaeaea]">
      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="border-b border-[#eaeaea] bg-[#f8f8f8]">
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left uppercase text-[#999]"
                style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em" }}>
                {header.replace(/([A-Z])/g, " $1").trim()}
              </th>
            ))}
            {onRemove && (
              <th
                className="px-4 py-3 text-left uppercase text-[#999]"
                style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em" }}>
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#eaeaea] transition-colors last:border-b-0 hover:bg-[#fafafa]">
              {headers.map((header) => (
                <td key={header} className="px-4 py-3 text-[#333]" style={{ fontSize: "13px" }}>
                  {row[header] || "—"}
                </td>
              ))}
              {onRemove && (
                <td className="px-4 py-3">
                  <button
                    onClick={() => onRemove(i)}
                    className="text-[#c0392b] transition-colors hover:text-[#e74c3c]"
                    style={{ fontSize: "12px", fontWeight: 600 }}>
                    Remove
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
