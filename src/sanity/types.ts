import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}
export interface Post {
  _id: string;
  _updatedAt: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  seoDescription?: string;
  mainImage?: SanityImageSource & { alt?: string };
  imageUrl?: string;
  categories: Category[];
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
  body: PortableTextBlock[];
  author?: {
    name: string;
    image?: SanityImageSource;
    bio?: PortableTextBlock[];
  };
  sources?: { _key: string; title: string; url: string }[];
}
export interface Deal {
  _id: string;
  title: string;
  description: string;
  link: string;
  image?: SanityImageSource;
  brand: string;
  features?: { name: string; value: string }[];
}
