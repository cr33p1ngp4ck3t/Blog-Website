import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";

interface Post extends SanityDocument {
  slug: {
    current: string;
  };
  _updatedAt: string;
}

interface Category extends SanityDocument {
  slug: {
    current: string;
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const posts = await client.fetch<Post[]>(`*[_type == "post" && defined(slug.current)]{
    slug,
    _updatedAt
  }`);

  const categories = await client.fetch<Category[]>(`*[_type == "category" && defined(slug.current)]{
    slug
  }`);

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/post/${post.slug.current}`,
    lastModified: post._updatedAt,
  }));

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug.current}`,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/deals`,
      lastModified: new Date(),
    },
  ];

  return [...staticUrls, ...postUrls, ...categoryUrls];
}
