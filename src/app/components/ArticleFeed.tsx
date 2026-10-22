"use client";
import { useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Post } from "@/sanity/types";
import PostCard from "./PostCard";
export default function ArticleFeed({
  posts,
  homepage = false,
}: {
  posts: Post[];
  homepage?: boolean;
}) {
  const [topic, setTopic] = useState("all");
  const [count, setCount] = useState(6);
  const [sort, setSort] = useState("latest");
  const topics = [
    { slug: "all", title: "All stories" },
    ...Array.from(
      new Map(posts.flatMap((post) => post.categories)
        .filter((category) => category.slug?.current)
        .map((category) => [category.slug.current, { slug: category.slug.current, title: category.title }])).values(),
    ),
  ];
  const filtered =
    topic === "all"
      ? posts
      : posts.filter((post) =>
          post.categories.some((category) => category.slug?.current === topic),
        );
  const sorted = [...filtered].sort((a, b) => sort === "quickest"
    ? a.readingTime - b.readingTime || (b.publishedAt || "").localeCompare(a.publishedAt || "")
    : (b.publishedAt || "").localeCompare(a.publishedAt || ""));
  return (
    <section id="latest" className="shell feed-section">
      <div className="section-heading">
        <div>
          <span className="section-label">
            {homepage ? "GOOD READS. BETTER DECISIONS." : "THE JOURNAL"}
          </span>
          <h2>
            {homepage ? (
              <>
                Fresh off the <span>press.</span>
              </>
            ) : (
              <>
                A little knowledge.
                <br />
                <span>A lot of possibility.</span>
              </>
            )}
          </h2>
        </div>
        {homepage && (
          <Link href="/articles" className="text-link">
            Explore all stories <ArrowUpRight size={18} />
          </Link>
        )}
      </div>
      <div className="topic-filters" aria-label="Filter stories by topic">
        {topics.map((item) => (
          <button
            key={item.slug}
            aria-pressed={topic === item.slug}
            className={topic === item.slug ? "active" : ""}
            onClick={() => {
              setTopic(item.slug);
              setCount(6);
            }}
          >
            {item.title}
            {topic === item.slug && <span aria-hidden="true">↗</span>}
          </button>
        ))}
      </div>
      <div className="feed-toolbar">
        <p aria-live="polite">{filtered.length} {filtered.length === 1 ? "story" : "stories"} to explore</p>
        <label>
          Sort stories
          <select value={sort} onChange={(event) => { setSort(event.target.value); setCount(6); }}>
            <option value="latest">Latest first</option>
            <option value="quickest">Quickest reads</option>
          </select>
        </label>
      </div>
      <div className="articles-grid">
        {sorted.slice(0, count).map((post, index) => (
          <PostCard post={post} index={index} key={post._id} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="empty-state" role="status">
          New stories are on the way. Explore another topic in the meantime.
        </p>
      )}
      {filtered.length > count && (
        <div className="feed-more">
          <button
            className="outline-button"
            onClick={() => setCount(count + 6)}
          >
            More good reads <ArrowDown size={17} />
          </button>
        </div>
      )}
    </section>
  );
}
