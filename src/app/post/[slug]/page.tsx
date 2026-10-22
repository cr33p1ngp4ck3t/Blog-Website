import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { notFound } from "next/navigation";
import { getPost, postImage } from "@/lib/posts";
import { jsonLd, siteUrl } from "@/lib/site";
import { urlFor } from "@/sanity/lib/image";
import ComparisonTable from "@/app/components/ComparisonTable";
import ProsCons from "@/app/components/ProsCons";
import TableOfContents from "@/app/components/TableOfContents";
import AuthorBio from "@/app/components/AuthorBio";
import SocialShare from "@/app/components/SocialShare";
import RelatedPosts from "@/app/components/RelatedPosts";
import DisqusComments from "@/app/components/DisqusComments";

interface PageProps {
  params: Promise<{ slug: string }>;
}
export const revalidate = 60;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return { title: "Story not found", robots: { index: false } };
  const description = post.seoDescription || post.excerpt;
  const url = `/post/${post.slug.current}`;
  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url,
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: [post.author?.name || "FinAid Hub editorial"],
      images: [
        {
          url: postImage(post),
          width: 1200,
          height: 630,
          alt: post.mainImage?.alt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [postImage(post)],
    },
  };
}
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <Image
        src={urlFor(value).width(1000).url()}
        alt={value.alt || "Article illustration"}
        width={1000}
        height={650}
      />
    ),
    comparisonTable: ({ value }) => <ComparisonTable value={value} />,
    prosCons: ({ value }) => <ProsCons value={value} />,
  },
  block: {
    h1: ({ children, value }) => (
      <h2 id={`section-${value._key}`}>{children}</h2>
    ),
    h2: ({ children, value }) => (
      <h2 id={`section-${value._key}`}>{children}</h2>
    ),
    h3: ({ children, value }) => (
      <h3 id={`section-${value._key}`}>{children}</h3>
    ),
    h4: ({ children, value }) => (
      <h4 id={`section-${value._key}`}>{children}</h4>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href =
        typeof value?.href === "string" &&
        /^(https?:\/\/|\/|#)/.test(value.href)
          ? value.href
          : "#";
      return (
        <a
          href={href}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};
export default async function PostPage({ params }: PageProps) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const postUrl = `${siteUrl}/post/${post.slug.current}`;
  const firstCategory = post.categories[0];
  const articleData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: new URL(postImage(post), siteUrl).href,
    author: {
      "@type":
        post.author?.name === "FinAid Hub editorial" || !post.author
          ? "Organization"
          : "Person",
      name: post.author?.name || "FinAid Hub editorial",
    },
    publisher: { "@type": "Organization", name: "FinAid Hub", url: siteUrl },
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    articleSection: post.categories.map((category) => category.title),
    inLanguage: "en-US",
  };
  return (
    <main id="main-content" className="shell article-shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/articles">The journal</Link>
        {firstCategory?.slug && (
          <>
            <span>/</span>
            <Link href={`/category/${firstCategory.slug.current}`}>
              {firstCategory.title}
            </Link>
          </>
        )}
      </nav>
      <article>
        <header className="article-heading">
          <div className="post-card-meta">
            <span>{firstCategory?.title || "The journal"}</span>
            <span>{post.readingTime} MIN READ</span>
          </div>
          <h1>{post.title}</h1>
          <p className="article-deck">{post.excerpt}</p>
          <div className="article-byline">
            <span className="author-icon" aria-hidden="true">
              F
            </span>
            <span>
              By <strong>{post.author?.name || "FinAid Hub editorial"}</strong>
            </span>
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </time>
            )}
            {!!post.sources?.length && <span>Sources linked below</span>}
          </div>
        </header>
        <div className="article-cover">
          <Image
            src={postImage(post, 1600)}
            alt={post.mainImage?.alt || post.title}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 1200px"
          />
        </div>
        <div className="article-reading">
          <TableOfContents body={post.body || []} />
          <div>
            <div className="prose">
              <PortableText
                value={post.body || []}
                components={portableTextComponents}
              />
              {!!post.sources?.length && (
                <section className="sources">
                  <h2 id="sources">Sources & further reading</h2>
                  <ol>
                    {post.sources.map((source) => (
                      <li key={source._key}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {source.title} ↗
                        </a>
                      </li>
                    ))}
                  </ol>
                  <p>
                    Educational information, researched October 2026. Confirm
                    current terms and eligibility directly with the official
                    provider.
                  </p>
                </section>
              )}
            </div>
            <AuthorBio author={post.author} />
            <SocialShare url={postUrl} title={post.title} />
            {process.env.NEXT_PUBLIC_DISQUS_SHORTNAME && (
              <DisqusComments
                post={{ title: post.title, slug: post.slug.current }}
              />
            )}
          </div>
        </div>
      </article>
      <RelatedPosts
        categories={post.categories}
        currentPostSlug={post.slug.current}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              {
                "@type": "ListItem",
                position: 2,
                name: "The journal",
                item: siteUrl + "/articles",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: postUrl,
              },
            ],
          }),
        }}
      />
    </main>
  );
}
