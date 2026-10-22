import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";
import ArticleFeed from "../components/ArticleFeed";
export const metadata: Metadata = {
  title: "The journal — practical money guides",
  description:
    "Explore guides to saving money, building an emergency fund, managing debt, avoiding scams, and finding financial assistance.",
  alternates: { canonical: "/articles" },
};
export const revalidate = 60;
export default async function ArticlesPage() {
  return (
    <main id="main-content">
      <ArticleFeed posts={await getPosts()} />
    </main>
  );
}
