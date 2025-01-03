/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Comments from "@/app/components/comments";
import Link from "next/link";

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
    params: Promise<{
        slug: string;
    }>;
}

export default async function PostPage({
    params,
}: PageProps) {
    const awaitedParams = await params;
    const post = await getPost(awaitedParams.slug);

    return (
        <>
            <div className="sticky left-[6%] top-[4%] flex justify-center items-center w-12 h-12 rounded-full hover:transform hover:scale-105 duration-300 ">
                <Link href="/" className="hover:underline text-black bg-white rounded-full "><Image src='/arrowback.svg' alt="" width="40" height="40" /></Link>
            </div>
            <div className="max-w-3xl mx-auto px-4">
                <main className="mt-8">
                    {post.mainImage && (
                        <Image
                            className="object-cover object-center rounded-lg w-full h-auto"
                            src={(urlFor(post.mainImage)).url()}
                            alt={post.title}
                            width={1024}
                            height={1024}
                            priority
                        />
                    )}
                    <div className="flex flex-col gap-2 my-8">
                        <h1 className="text-4xl font-bold ">{post.title}</h1>
                        <div className="flex gap-4 text-gray-700">
                            <div>By: {post.author?.name ? post.author.name : 'Anonymous'}</div>
                            <p>{post.publishedAt ? `Published:  ${new Date(post.publishedAt).toLocaleDateString()}` : ''}</p>
                        </div>
                    </div>
                    <div className="prose lg:prose-xl">
                        {Array.isArray(post.body) && <PortableText value={post.body} />}
                    </div>
                    <div className="mt-4 mb-8">
                        <div className="font-bold p-2 mb-2 flex items-center gap-3">Categories: 
                            {post.categories ?(
                                <span className="flex gap-2">
                                    {post.categories?.map((category: { _id: number; title: string; }) => 
                                        (
                                            <div key={category._id} className="bg-[#dfeff9] dark:bg-[#101318] text-[#101318] dark:text-[#dfeff9] p-2 cursor-pointer font-normal rounded-2xl w-fit text-sm hover:transform hover:scale-105 duration-300">
                                                {category.title}
                                            </div>
                                        )
                                    )} 
                                </span>
                            ) : (
                                <span className="text-[#101318] dark:text-[#dfeff9]">
                                    None
                                </span>
                            )}
                        </div>
                    </div>
                    <Comments postId={post._id} />
                </main>
            </div>
        </>
    );
}