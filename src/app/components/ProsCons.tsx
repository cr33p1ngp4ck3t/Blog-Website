interface ProsConsProps {
  value: {
    title: string;
    pros: string[];
    cons: string[];
  };
}

export default function ProsCons({ value }: ProsConsProps) {
  const { title, pros, cons } = value;

  return (
    <div className="my-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-green-500">Pros</h3>
          <ul className="space-y-2">
            {pros.map((pro) => (
              <li key={pro} className="flex items-start text-gray-600 dark:text-gray-400">
                <span className="text-green-500 mr-2">✔</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-red-500">Cons</h3>
          <ul className="space-y-2">
            {cons.map((con) => (
              <li key={con} className="flex items-start text-gray-600 dark:text-gray-400">
                <span className="text-red-500 mr-2">❌</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
