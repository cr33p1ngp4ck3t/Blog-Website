import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/sanity/types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TableOfContents from "@/app/components/TableOfContents";

interface PageProps {
  params: {
    slug: string;
  };
}

const getPost = async (slug: string) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    body,
    "author": author->name,
    "categories": categories[]->title,
    "slug": slug.current,
    publishedAt
  }`;

  const post = await client.fetch(query, { slug });
  return post;
};

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post: Post = await getPost(params.slug);
  if (!post) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  return {
    title: post.title,
    description: "A blog post about " + post.title,
  };
}

export default async function PostPage({ params }: PageProps) {
  const post: Post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="md:col-span-1">
        <TableOfContents body={post.body} />
      </div>
      <article className="md:col-span-3">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          {post.title}
        </h1>
        <div className="mt-4 text-gray-600 dark:text-gray-400">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
        </div>
        <div className="mt-6">
          {post.categories.map((category: string) => (
            <Link
              key={category}
              href={`/category/${category.toLowerCase().replace(/ /g, "-")}`}
              className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2"
            >
              {category}
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div className="prose prose-lg dark:prose-invert mt-8">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      </article>
    </main>
  );
}

interface ImageValue {
  alt?: string;
}

type Children = string | React.ReactNode;

const portableTextComponents = {
  types: {
    image: ({ value }: { value: ImageValue }) => (
      <Image
        src={urlFor(value).url()}
        alt={value.alt || " "}
        width={800}
        height={400}
        className="rounded-lg"
      />
    ),
  },
  block: {
    h1: ({ children }: { children: Children }) => (
      <h1 id={String(children).toLowerCase().replace(/ /g, "-")} className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
        {children}
      </h1>
    ),
    h2: ({ children }: { children: Children }) => (
      <h2 id={String(children).toLowerCase().replace(/ /g, "-")} className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        {children}
      </h2>
    ),
    h3: ({ children }: { children: Children }) => (
      <h3 id={String(children).toLowerCase().replace(/ /g, "-")} className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        {children}
      </h3>
    ),
    normal: ({ children }: { children: Children }) => (
      <p>{children}</p>
    ),
  },
};
