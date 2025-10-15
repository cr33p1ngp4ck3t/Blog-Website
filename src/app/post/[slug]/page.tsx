import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/sanity/types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import TableOfContents from "@/app/components/TableOfContents";
import RelatedPosts from "@/app/components/RelatedPosts";
import AuthorBio from "@/app/components/AuthorBio";
import SocialShare from "@/app/components/SocialShare";
import ComparisonTable from "@/app/components/ComparisonTable";
import ProsCons from "@/app/components/ProsCons";

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
    "author": author->{name, image, bio},
    "categories": categories[]->title,
    "slug": slug.current,
    publishedAt,
    _updatedAt,
    "excerpt": array::join(string::split((pt::text(body)), "")[0..155], "") + "..."
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
	const post: Post & { _updatedAt: string; excerpt: string } = await getPost(params.slug);

	if (!post) {
		notFound();
	}

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		image: urlFor(post.mainImage).url(),
		author: {
			"@type": "Person",
			name: post.author.name,
		},
		publisher: {
			"@type": "Organization",
			name: "Financial Aid Hub",
			logo: {
				"@type": "ImageObject",
				url: "https://www.financialaidhub.com/logo.png",
			},
		},
		datePublished: post.publishedAt,
		dateModified: post._updatedAt,
		description: post.excerpt,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${process.env.NEXT_PUBLIC_BASE_URL}/post/${post.slug.current}`,
		},
	};

	return (
		<main className="max-w-5xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-4 gap-8">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<div className="md:col-span-1">
				<TableOfContents body={post.body} />
			</div>
			<article className="md:col-span-3">
				<h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
					{post.title}
				</h1>
				<div className="mt-4 text-gray-600 dark:text-gray-400">
					<span>By {post.author.name}</span>
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
				<div className="mt-8">
					<AuthorBio author={post.author} />
				</div>
				<div className="mt-8">
					<SocialShare url={`/post/${post.slug.current}`} title={post.title} />
				</div>
			</article>
			<div className="md:col-span-4 mt-8">
				<RelatedPosts categories={post.categories} currentPostSlug={post.slug.current} />
			</div>
		</main>
	);
}

interface ImageValue {
	asset: string;
	alt?: string;
}

interface ComparisonTableValue {
	title: string;
	rows: {
		productName: string;
		features: string[];
	}[];
}

interface ProsConsValue {
	title: string;
	pros: string[];
	cons: string[];
}

type Children = string | React.ReactNode;

interface ChildrenProps {
	children?: Children;
}

const portableTextComponents = {
	types: {
		image: ({ value }: { value: ImageValue }) => (
			<Image
				src={urlFor(value.asset).url()}
				alt={value.alt || " "}
				width={800}
				height={400}
				className="rounded-lg"
			/>
		),
		comparisonTable: ({ value }: { value: ComparisonTableValue }) => (
			<ComparisonTable value={value} />
		),
		prosCons: ({ value }: { value: ProsConsValue }) => <ProsCons value={value} />,
	},
	block: {
		h1: ({ children }: ChildrenProps) => (
			<h1
				id={String(children).toLowerCase().replace(/ /g, "-")}
				className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white"
			>
				{children}
			</h1>
		),
		h2: ({ children }: ChildrenProps) => (
			<h2
				id={String(children).toLowerCase().replace(/ /g, "-")}
				className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
			>
				{children}
			</h2>
		),
		h3: ({ children }: ChildrenProps) => (
			<h3
				id={String(children).toLowerCase().replace(/ /g, "-")}
				className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
			>
				{children}
			</h3>
		),
		normal: ({ children }: ChildrenProps) => <p>{children}</p>,
	},
};
