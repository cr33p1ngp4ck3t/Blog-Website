import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategories, getPosts } from "@/lib/posts";
import PostCard from "@/app/components/PostCard";
interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const category = (await getCategories()).find(
    (item) => item.slug.current === slug,
  );
  return category
    ? {
        title: category.title,
        description:
          category.description ||
          `Explore practical guides and stories about ${category.title.toLowerCase()}.`,
        alternates: { canonical: `/category/${slug}` },
      }
    : { title: "Topic not found", robots: { index: false } };
}
export const revalidate = 60;
export default async function CategoryPage({ params, searchParams }: Props) {
  const [{ slug }, query, posts, categories] = await Promise.all([
    params,
    searchParams,
    getPosts(),
    getCategories(),
  ]);
  const category = categories.find((item) => item.slug.current === slug);
  if (!category) notFound();
  const page = Math.max(
    1,
    Number.isSafeInteger(Number(query.page)) ? Number(query.page) : 1,
  );
  const filtered = posts.filter((post) =>
    post.categories.some((item) => item.slug?.current === slug),
  );
  const visible = filtered.slice((page - 1) * 9, page * 9);
  return (
    <main id="main-content" className="shell">
      <div className="page-intro">
        <span className="section-label">THE JOURNAL / {category.title}</span>
        <h1>
          {category.title}
          <span className="orange-dot">.</span>
        </h1>
        <p>
          {category.description ||
            "A little knowledge for your next good move."}
        </p>
      </div>
      <div className="category-grid">
        <div className="articles-grid">
          {visible.map((post, index) => (
            <PostCard key={post._id} post={post} index={index} />
          ))}
        </div>
        {visible.length === 0 && (
          <p className="empty-state">
            No stories on this page yet.{" "}
            <Link className="text-link" href="/articles">
              Explore the journal ↗
            </Link>
          </p>
        )}
        <nav aria-label="Pagination" className="feed-more">
          {page > 1 && (
            <Link
              href={`/category/${slug}?page=${page - 1}`}
              className="outline-button"
            >
              Previous page
            </Link>
          )}
          {filtered.length > page * 9 && (
            <Link
              href={`/category/${slug}?page=${page + 1}`}
              className="outline-button"
            >
              Next page
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
