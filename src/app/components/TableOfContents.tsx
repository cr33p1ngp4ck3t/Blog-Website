import type { PortableTextBlock } from "@portabletext/types";
export default function TableOfContents({
  body,
  hasTakeaways = false,
  hasFaqs = false,
  hasSources = false,
}: {
  body: PortableTextBlock[];
  hasTakeaways?: boolean;
  hasFaqs?: boolean;
  hasSources?: boolean;
}) {
  const headings = body.filter(
    (block) =>
      block._type === "block" && ["h1", "h2", "h3"].includes(block.style || ""),
  );
  if (!headings.length && !hasTakeaways && !hasFaqs && !hasSources) return null;
  return (
    <nav className="toc" aria-label="On this page">
      <h2>In this guide</h2>
      <ol>
        {hasTakeaways && <li><a href="#takeaways-heading">Key takeaways</a></li>}
        {headings.map((block) => (
          <li key={block._key}>
            <a href={`#section-${block._key}`}>
              {block.children.map((child) => child.text || "").join("")}
            </a>
          </li>
        ))}
        {hasFaqs && <li><a href="#questions-heading">Reader questions</a></li>}
        {hasSources && <li><a href="#sources">Sources & further reading</a></li>}
      </ol>
    </nav>
  );
}
