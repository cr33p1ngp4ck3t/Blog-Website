import { cache } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Category, Post } from "@/sanity/types";

export const postFields = `_id, _updatedAt, title, slug, mainImage, imageUrl, publishedAt, featured,
  "excerpt": coalesce(excerpt, array::join(string::split(pt::text(body), "")[0..160], "")),
  seoDescription, "readingTime": coalesce(readingTime, 5),
  "categories": coalesce(categories[]->{_id, title, slug, description}, [])`;

export const activePostFilter = `_type == "post" && !(_id in path("drafts.**")) && archived != true && defined(slug.current) && (!defined(publishedAt) || publishedAt <= now())`;

export const getPosts = cache(async () =>
  client.fetch<Post[]>(
    `*[${activePostFilter}] | order(coalesce(publishedAt, "1970-01-01T00:00:00Z") desc) {${postFields}}`,
    {},
    { next: { revalidate: 60 } },
  ),
);
export const getCategories = cache(async () =>
  client.fetch<Category[]>(
    `*[_type == "category" && defined(slug.current) && count(*[${activePostFilter} && references(^._id)]) > 0] | order(title asc) {_id, title, slug, description}`,
    {},
    { next: { revalidate: 60 } },
  ),
);
export const getPost = cache(async (slug: string) =>
  client.fetch<Post | null>(
    `*[_type == "post" && !(_id in path("drafts.**")) && slug.current == $slug && (!defined(publishedAt) || publishedAt <= now())][0] {${postFields}, body, sources, archived, reviewedAt, keyTakeaways, faqs, "relatedPosts": coalesce(relatedPosts[defined(@->_id)]->{_id}, []), "author": author->{name, image, bio}}`,
    { slug },
    { next: { revalidate: 60 } },
  ),
);
export function postImage(
  post: Pick<Post, "mainImage" | "imageUrl">,
  width = 1200,
) {
  return post.mainImage
    ? urlFor(post.mainImage).width(width).url()
    : post.imageUrl || "/images/money.jpg";
}
