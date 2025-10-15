import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import ComparisonTable from "@/app/components/ComparisonTable";
import ProsCons from "@/app/components/ProsCons";
import TableOfContents from "@/app/components/TableOfContents";
import AuthorBio from "@/app/components/AuthorBio";
import SocialShare from "@/app/components/SocialShare";
import RelatedPosts from "@/app/components/RelatedPosts";
import { Metadata } from "next";

import { PortableTextBlock } from "sanity";

interface Post extends SanityDocument {
  title: string;
  slug: {
    current: string;
  };
  author: {
    name: string;
    slug: {
      current: string;
    };
    image: {
      asset: {
        _ref: string;
        _type: string;
      };
      alt: string;
    };
    bio: PortableTextBlock[];
  };
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt: string;
  };
  categories: {
    title: string;
    slug: {
      current: string;
    };
  }[];
  publishedAt: string;
  body: PortableTextBlock[];
  excerpt: string;
}

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    return {
      title: "Not Found",
      description: "This page does not exist.",
    };
  }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: urlFor(post.mainImage).width(1200).height(630).fit("crop").url(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

async function getPost(slug: string) {
  const post = await client.fetch<Post>(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      author->{
        name,
        slug,
        image,
        bio
      },
      mainImage,
      categories[]->{
        title,
        slug
      },
      publishedAt,
      body,
      "excerpt": array::join(string::split((pt::text(body)), "")[0..155], "") + "..."
    }`,
    { slug }
  );
  return post;
}

import { PortableTextComponents } from "@portabletext/react";

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string; _type: string }; alt: string } }) => (
      <div className="relative h-96 w-full my-8">
        <Image
          src={urlFor(value).url()}
          alt={value.alt}
          fill
          className="object-contain rounded-md"
        />
      </div>
    ),
    comparisonTable: ({ value }: { value: { rows: { cells: string[] }[] } }) => <ComparisonTable {...value} />,
    prosCons: ({ value }: { value: { pros: string[]; cons: string[] } }) => <ProsCons {...value} />,
  },
  block: {
    h1: ({ children }) => <h1 id={String(children).toLowerCase().replace(/ /g, "-")} className="text-4xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 id={String(children).toLowerCase().replace(/ /g, "-")} className="text-3xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 id={String(children).toLowerCase().replace(/ /g, "-")} className="text-2xl font-bold">{children}</h3>,
  },
};

export default async function PostPage({ params }: PageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const postUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/post/${post.slug.current}`;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
      <article>
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h1>
          <div className="mt-4 md:mt-6 flex items-center justify-center space-x-4 text-gray-600 dark:text-gray-400">
            {post.author.image && (
              <Image
                src={urlFor(post.author.image).url()}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <span>{post.author.name}</span>
            <span>•</span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap justify-center space-x-2">
            {post.categories.map((category) => (
              <Link
                href={`/category/${category.slug.current}`}
                key={category.slug.current}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="relative h-96 w-full my-8">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.mainImage.alt}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <TableOfContents body={post.body} />
          </div>
          <div className="md:col-span-3 prose dark:prose-invert max-w-none">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        </div>
        <div className="mt-8 space-y-8">
          <SocialShare url={postUrl} title={post.title} />
          <AuthorBio author={post.author} />
          <RelatedPosts
            categories={post.categories.map((cat) => cat.title)}
            currentPostSlug={post.slug.current}
          />
        </div>
      </article>
    </main>
  );
}
