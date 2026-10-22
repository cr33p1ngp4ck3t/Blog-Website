import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { postImage } from "@/lib/posts";
import type { Post } from "@/sanity/types";
export default function PostCard({
  post,
  index = 0,
}: {
  post: Post;
  index?: number;
}) {
  return (
    <article className="post-card">
      <Link
        className="post-image-link"
        href={`/post/${post.slug.current}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={postImage(post, 800)}
          alt={post.mainImage?.alt || post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
          className="post-image"
        />
        <span className="card-arrow">
          <ArrowUpRight size={22} />
        </span>
      </Link>
      <div className="post-card-meta">
        <span>{post.categories[0]?.title || "The journal"}</span>
        <span>{post.readingTime} MIN READ</span>
      </div>
      <h3>
        <Link href={`/post/${post.slug.current}`}>{post.title}</Link>
      </h3>
      <p>{post.excerpt}</p>
      <div className="post-card-bottom">
        <time dateTime={post.publishedAt}>
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })
            : "From the archive"}
        </time>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
    </article>
  );
}
