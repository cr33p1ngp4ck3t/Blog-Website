import { getPosts } from "@/lib/posts";
import type { Category } from "@/sanity/types";
import PostCard from "./PostCard";
export default async function RelatedPosts({
  categories,
  currentPostSlug,
}: {
  categories: Category[];
  currentPostSlug: string;
}) {
  const posts = (await getPosts()).filter(
    (post) => post.slug.current !== currentPostSlug,
  );
  const matching = posts.filter((post) =>
    post.categories.some((category) =>
      categories.some((current) => current._id === category._id),
    ),
  );
  const related = [
    ...matching,
    ...posts.filter((post) => !matching.includes(post)),
  ].slice(0, 3);
  if (!related.length) return null;
  return (
    <section className="related-section">
      <h2>Your next good read.</h2>
      <div className="articles-grid">
        {related.map((post, index) => (
          <PostCard key={post._id} post={post} index={index} />
        ))}
      </div>
    </section>
  );
}
