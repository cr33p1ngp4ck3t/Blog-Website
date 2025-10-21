import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/sanity/types";
import Image from "next/image";
import Link from "next/link";

interface RelatedPostsProps {
	categories: string[];
	currentPostSlug: string;
}

const getRelatedPosts = async (categories: string[], currentPostSlug: string) => {
	const query = `*[_type == "post" && slug.current != $currentPostSlug && count((categories[]->title)[@ in $categories]) > 0] | order(count((categories[]->title)[@ in $categories]) desc) [0...3] {
    title,
    mainImage,
    "slug": slug.current,
  }`;

	const posts = await client.fetch(query, { categories, currentPostSlug });
	return posts;
};

export default async function RelatedPosts({ categories, currentPostSlug }: RelatedPostsProps) {
	const relatedPosts: Post[] = await getRelatedPosts(categories, currentPostSlug);

	if (relatedPosts.length === 0) {
		return null;
	}

	return (
		<div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
			<h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Related Posts</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{relatedPosts.map((post, index) => (
					<Link
						key={index}
						href={`/post/${post.slug}`}
						className="border rounded-lg overflow-hidden block bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
					>
						<Image
							src={urlFor(post.mainImage)}
							alt={post.title}
							width={400}
							height={200}
							className="object-cover w-auto"
						/>
						<div className="p-4">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								{post.title}
							</h3>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
