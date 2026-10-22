import { getPosts } from "@/lib/posts";
import { siteDescription, siteUrl } from "@/lib/site";
export const revalidate = 3600;
const xml = (value: string) =>
  value.replace(
    /[<>&"']/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[char]!,
  );
export async function GET() {
  const posts = await getPosts();
  const items = posts
    .slice(0, 30)
    .map(
      (post) =>
        `<item><title>${xml(post.title)}</title><link>${xml(siteUrl + "/post/" + post.slug.current)}</link><guid>${xml(siteUrl + "/post/" + post.slug.current)}</guid><description>${xml(post.excerpt || "")}</description>${post.publishedAt ? "<pubDate>" + new Date(post.publishedAt).toUTCString() + "</pubDate>" : ""}</item>`,
    )
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>FinAid Hub</title><link>${xml(siteUrl)}</link><description>${xml(siteDescription)}</description><language>en-us</language>${items}</channel></rss>`,
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  );
}
