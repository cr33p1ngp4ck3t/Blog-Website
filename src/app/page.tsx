import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { SanityDocument } from "next-sanity";

interface Post extends SanityDocument {
	title: string;
	slug: {
		current: string;
	};
	mainImage: {
		asset: string;
		alt: string;
	};
	excerpt: string;
}

async function getPosts() {
	const posts = await client.fetch<
		Post[]
	>(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage,
    "excerpt": array::join(string::split((pt::text(body)), "")[0..120], "") + "..."
  }`);
	return posts;
}

export default async function Home() {
	const posts = await getPosts();

	return (
		<main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
			<div className="text-center">
				<h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
					Your Trusted Guide to Financial Stability
				</h1>
				<p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
					Navigating financial assistance programs and finding the best ways to save can
					be overwhelming. We{`'`}re here to simplify it for you.
				</p>
			</div>

			<div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
				<Link
					href="/category/government-assistance"
					className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
				>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
						Government Assistance
					</h2>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Find and apply for stimulus, housing, and other government aid programs.
					</p>
				</Link>
				<Link
					href="/category/financial-health"
					className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
				>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
						Financial Health
					</h2>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Get help with credit card debt and explore insurance options to protect your
						future.
					</p>
				</Link>
				<Link
					href="/category/home-savings"
					className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
				>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
						Home Savings
					</h2>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Discover practical tips and products to help you save on your utility bills.
					</p>
				</Link>
			</div>

			<div className="mt-12 md:mt-16">
				<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
					Latest Articles
				</h2>
				<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
					{posts.map((post) => (
						<Link
							href={`/post/${post.slug.current}`}
							key={post._id}
							className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex flex-col"
						>
							<div className="relative h-48 w-full">
								<Image
									src={urlFor(post.mainImage.asset).auto("format").url()}
									alt={`${post.mainImage.alt}`}
									fill
									className="object-cover rounded-md"
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
			</div>
		</main>
	);
}
