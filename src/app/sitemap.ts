import type { MetadataRoute } from "next";
import { getCategories, getPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/site";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  return [
    ...[
      "",
      "/articles",
      "/deals",
      "/compare",
      "/about",
      "/contact",
      "/privacy-policy",
      "/terms-of-service",
    ].map((path) => ({ url: siteUrl + path })),
    ...posts.map((post) => ({
      url: `${siteUrl}/post/${post.slug.current}`,
      lastModified: post._updatedAt,
    })),
    ...categories.map((category) => ({
      url: `${siteUrl}/category/${category.slug.current}`,
    })),
  ];
}
