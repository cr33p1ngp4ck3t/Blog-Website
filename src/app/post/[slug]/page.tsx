import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Comments from "@/app/components/comments";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

export const dynamic = "force-dynamic";

async function getPost(slug: string) {
    const query = groq`
    *[_type == "post" && slug.current == $slug][0] {
        ...,
        author->,
        categories[]->
    }
    `;
    const post = await client.fetch(query, { slug });
    return post;
}

interface PageProps {
    params: {
        slug: string;
    };
}

export default async function PostPage({ params }: PageProps) {
    const post = await getPost(params.slug);

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
            <article>
                <header className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                        {post.title}
                    </h1>
                    <div className="mt-4 flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>By: {post.author?.name ?? 'Anonymous'}</span>
                        <span>
                            {post.publishedAt ? `Published on ${new Date(post.publishedAt).toLocaleDateString()}` : ''}
                        </span>
                    </div>
                </header>

                {post.mainImage && (
                    <div className="mb-8">
                        <Image
                            className="object-cover object-center rounded-lg w-full h-auto"
                            src={urlFor(post.mainImage).url()}
                            alt={post.title ?? 'Blog post image'}
                            width={1200}
                            height={675}
                            priority
                            loading="eager"
                        />
                    </div>
                )}

                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
                    {Array.isArray(post.body) && <PortableText value={post.body} />}
                </div>

                <footer className="mt-12">
                    {post.categories && post.categories.length > 0 && (
                        <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg">Categories:</h3>
                            <div className="flex flex-wrap gap-2">
                                {post.categories.map((category: { _id: string; title: string; }) => (
                                    <div key={category._id} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                                        {category.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-12">
                      <Comments postId={post._id} />
                    </div>
                </footer>
            </article>
        </main>
    );
}
