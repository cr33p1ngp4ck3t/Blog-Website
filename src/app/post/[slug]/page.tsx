import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
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

interface Block {
	_key: string;
	_type: string;
	style?: string;
	children: { text: string }[];
}

interface Post {
	title: string;
	slug: string;
	author: {
		name: string;
		slug: {
			current: string;
		};
		image: {
			asset: string;
			alt: string;
		};
		bio: PortableTextBlock[];
	};
	mainImage: {
		asset: string;
		alt: string;
	};
	categories: string[];
	publishedAt: string;
	body: Block[];
	excerpt: string;
}

interface PageProps {
	params: Promise<{
		slug: string;
	}>;
}

const getPost = async (slug: string) => {
	const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    body,
    "author": author->{name, image, bio},
    "categories": categories[]->title,
    "slug": slug.current,
    publishedAt
  }`;

	const post = await client.fetch(query, { slug });
	return post;
};

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const post: Post = await getPost((await params).slug);
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
	const post: Post = await getPost((await params).slug);

	if (!post) {
		notFound();
	}

	return (
		// Rows
		<main className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid md:grid-flow-row gap-8">
			{/* Column 1 */}
			<div className="grid grid-cols-1 md:grid-cols-5 gap-8">
				<div className="md:col-span-1">
					<TableOfContents body={post.body} />
				</div>
				<article className="md:col-span-3">
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
						{post.title}
					</h1>
					<div className="mt-4 text-gray-600 dark:text-gray-400">
						<span>By {post.author ? post.author.name : "Anonymous"}</span>
						<span className="mx-2">•</span>
						<span>{new Date(post.publishedAt).toLocaleDateString()}</span>
					</div>
					<div className="mt-6">
						{post.categories.map((category, index) => (
							<Link
								key={index}
								href={`/category/${category.toLowerCase().replace(/ /g, "-")}`}
								className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2"
							>
								{category}
							</Link>
						))}
					</div>
					<div className="mt-8">
						<Image
							src={urlFor(post.mainImage.asset).auto("format").url()}
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
						<SocialShare url={`/post/${post.slug}`} title={post.title} />
					</div>
				</article>
			</div>
			{/* column 2 */}
			<div className="grid grid-cols-1 md:grid-cols-5 gap-8">
				<div className="md:col-span-1 	"></div>
				<div className="md:col-span-3 mt-8">
					<RelatedPosts categories={post.categories} currentPostSlug={post.slug} />
				</div>
			</div>
		</main>
	);
}

interface ImageValue {
	src: string;
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
				src={urlFor(value.src).auto("format").url()}
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
				className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white my-4 mb-2"
			>
				{children}
			</h1>
		),
		h2: ({ children }: ChildrenProps) => (
			<h2
				id={String(children).toLowerCase().replace(/ /g, "-")}
				className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white my-4 mb-2"
			>
				{children}
			</h2>
		),
		h3: ({ children }: ChildrenProps) => (
			<h3
				id={String(children).toLowerCase().replace(/ /g, "-")}
				className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white my-4 mb-2"
			>
				{children}
			</h3>
		),
		h4: ({ children }: ChildrenProps) => (
			<h4
				id={String(children).toLowerCase().replace(/ /g, "-")}
				className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white my-4 mb-2"
			>
				{children}
			</h4>
		),
		normal: ({ children }: ChildrenProps) => <p>{children}</p>,
	},
};
