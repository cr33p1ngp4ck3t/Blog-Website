"use client";

interface HighlightProps {
  text: string;
  query: string;
}

export default function Highlight({ text, query }: HighlightProps) {
  if (!query) {
    return <span>{text}</span>;
  }

  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="bg-yellow-200 dark:bg-yellow-700">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}
