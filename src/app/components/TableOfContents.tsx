import type { PortableTextBlock } from "@portabletext/types";
export default function TableOfContents({
  body,
}: {
  body: PortableTextBlock[];
}) {
  const headings = body.filter(
    (block) =>
      block._type === "block" && ["h1", "h2", "h3"].includes(block.style || ""),
  );
  if (!headings.length) return null;
  return (
    <nav className="toc" aria-label="On this page">
      <h2>In this guide</h2>
      <ol>
        {headings.map((block) => (
          <li key={block._key}>
            <a href={`#section-${block._key}`}>
              {block.children.map((child) => child.text || "").join("")}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
