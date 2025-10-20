import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { SanityDocument } from "next-sanity";

interface Post extends SanityDocument {
	title: string;
	slug: {
		current: string;
	};
	mainImage: {
		asset: string;
		alt: string;
		src: string;
		blurDataURL: string;
	};
	excerpt: string;
}

const POSTS_PER_PAGE = 6;

async function getPostsByCategory(slug: string, page: number) {
	const start = (page - 1) * POSTS_PER_PAGE;
	const end = start + POSTS_PER_PAGE;
	const posts = await client.fetch<Post[]>(
		`*[_type == "post" && defined(slug.current) && $slug in categories[]->slug.current] | order(publishedAt desc)[${start}...${end}] {
    _id,
    title,
    slug,
    mainImage,
    "excerpt": array::join(string::split((pt::text(body)), "")[0..120], "") + "..."
  }`,
		{ slug }
	);

	const postsWithBlurData = await Promise.all(
		posts.map(async (post) => {
			const { src, blurDataURL } = await urlFor(post.mainImage);
			return {
				...post,
				mainImage: {
					...post.mainImage,
					src,
					blurDataURL,
				},
			};
		})
	);

	return postsWithBlurData;
}

export default async function CategoryPage({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const page = typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
	const posts = await getPostsByCategory(params.slug, page);
	const categoryName =
		params.slug.charAt(0).toUpperCase() + params.slug.slice(1).replace(/-/g, " ");

	return (
		<main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
			<div className="text-center">
				<h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
					{categoryName}
				</h1>
			</div>
			<div className="mt-12 md:mt-16">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
					{posts.map((post) => (
						<Link
							href={`/post/${post.slug.current}`}
							key={post._id}
							className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex flex-col"
						>
							<div className="relative h-48 w-full">
								<Image
									src={post.mainImage.src}
									alt={post.mainImage.alt}
									fill
									className="object-cover rounded-md"
									placeholder="blur"
									blurDataURL={post.mainImage.blurDataURL}
								/>
							</div>
							<h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
								{post.title}
							</h3>
							<p className="mt-2 text-gray-600 dark:text-gray-400 flex-grow">
								{post.excerpt}
							</p>
						</Link>
					))}
				</div>
				<div className="mt-8 flex justify-center space-x-4">
					{page > 1 && (
						<Link
							href={{
								pathname: `/category/${params.slug}`,
								query: { page: page - 1 },
							}}
							className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md"
						>
							Previous
						</Link>
					)}
					{posts.length === POSTS_PER_PAGE && (
						<Link
							href={{
								pathname: `/category/${params.slug}`,
								query: { page: page + 1 },
							}}
							className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md"
						>
							Next
						</Link>
					)}
				</div>
			</div>
		</main>
	);
}
