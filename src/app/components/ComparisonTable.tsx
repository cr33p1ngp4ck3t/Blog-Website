interface ComparisonTableProps {
  value: {
    title: string;
    rows: {
      productName: string;
      features: string[];
    }[];
  };
}

export default function ComparisonTable({ value }: ComparisonTableProps) {
  const { title, rows } = value;
  const headers = rows.reduce((acc: string[], row) => {
    row.features.forEach((feature) => {
      if (!acc.includes(feature)) {
        acc.push(feature);
      }
    });
    return acc;
  }, []);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-4 font-semibold text-gray-900 dark:text-white">Product</th>
              {headers.map((header) => (
                <th key={header} className="p-4 font-semibold text-gray-900 dark:text-white">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.productName} className={index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800/50"}>
                <td className="p-4 font-semibold text-gray-900 dark:text-white">{row.productName}</td>
                {headers.map((header) => (
                  <td key={header} className="p-4 text-center text-gray-600 dark:text-gray-400">
                    {row.features.includes(header) ? (
                      <span className="text-green-500">✔</span>
                    ) : (
                      <span className="text-red-500">❌</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
