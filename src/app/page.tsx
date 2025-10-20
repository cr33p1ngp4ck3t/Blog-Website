import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { SanityDocument } from "next-sanity";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

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

async function getPosts(page: number) {
	const start = (page - 1) * POSTS_PER_PAGE;
	const end = start + POSTS_PER_PAGE;
	const posts = await client.fetch<
		Post[]
	>(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[${start}...${end}] {
    _id,
    title,
    slug,
    mainImage,
    "excerpt": array::join(string::split((pt::text(body)), "")[0..120], "") + "..."
  }`);

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

export default async function Home({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const awaitedSearchParams = await searchParams;
	const page =
		typeof awaitedSearchParams.page === "string" ? Number(awaitedSearchParams.page) : 1;
	const posts = await getPosts(page);

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
				<div className="mt-6 ">
					<Carousel
						orientation="horizontal"
						opts={{
							align: "center",
							loop: true,
						}}
					>
						<CarouselContent>
							{posts.map((post) => (
								<CarouselItem key={post._id} className="basis-auto md:basis-1/3">
									<Link
										href={`/post/${post.slug.current}`}
										className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex flex-col"
									>
										<div className="relative h-48 w-full">
											<Image
												src={post.mainImage.src}
												alt={`${post.mainImage.alt}`}
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
								</CarouselItem>
							))}
						</CarouselContent>

						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
				<div className="mt-8 flex justify-center space-x-4">
					{page > 1 && (
						<Link
							href={{
								pathname: "/",
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
								pathname: "/",
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
