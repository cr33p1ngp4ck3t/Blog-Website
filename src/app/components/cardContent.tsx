"use client";
import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client, writeClient } from "../../sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import {  useEffect, useState } from "react";
import React from 'react'

// Sample POSTS_QUERY with comments
const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  ]|order(publishedAt desc)[0...12]{
    _id, 
    mainImage, 
    title, 
    slug, 
    publishedAt, 
    "author": author->{ name }, 
    categories[]->,
    "comments": *[_type == "comment" && references(^._id)] { _id },
    views
  }`;

async function fetchPosts() {
  const result = await client.fetch<SanityDocument[]>(POSTS_QUERY);
  return result;
}

async function incrementViewCount(postId: string) {
  await writeClient.patch(postId)
    .setIfMissing({ views: 0 })
    .inc({ views: 1 })
    .commit();
}

interface Props  {
    id?: string;
    style?: React.CSSProperties;
}

export const  CardContent: React.FC<Props> = ({ id, style }) => {
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchPosts();
      setPosts(result);
    };
    fetchData();
  }, []);

  const handleClick = async (postId: string) => {
    await incrementViewCount(postId);
    setClickCounts((prevCounts) => ({
      ...prevCounts,
      [postId]: (prevCounts[postId] || 0) + 1,
    }));

    const updatedPosts = await fetchPosts();
    setPosts(updatedPosts);
  };
  return (
    < >
        <div className="grid grid-cols-3 gap-5 my-6" id={id} style={style} >
            {posts.map((post) => (
                <Link
                    href={`/post/${post.slug.current}`}
                    className=""
                    onClick={() => handleClick(post._id)}
                    key={post._id}
                >
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-white hover:transform hover:scale-[1.03] duration-300 shadow-sm hover:shadow-lg hover:shadow-slate-800 shadow-slate-800">
                    <div className="rounded-lg overflow-hidden flex justify-center align-center w-auto h-[260px]">
                        <Image
                        src={urlFor(post.mainImage).url()}
                        alt={post.title}
                        height="1024"
                        width="1024"
                        className="object-cover bg-center"
                        priority
                        />
                    </div>
                    <div className="py-6 px-4 flex flex-col h-fit justify-between">
                        <div>
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                            {post.categories ? post.categories.map((category: { title: string }) => category.title).join(', ') : 'None'}
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            {post.title}
                        </h1>
                        </div>
                        <div>
                        {/* <p className="leading-relaxed mb-3">
                            {post.description || "No description available."}
                        </p> */}
                        <div className="flex items-center flex-wrap">
                            <div className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                            Learn More
                            <svg
                                className="w-4 h-4 ml-2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>
                            </div>
                            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                            <svg
                                className="w-4 h-4 mr-1"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                            >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            {clickCounts[post._id] || post.views || 0}
                            </span>
                            <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                            <svg
                                className="w-4 h-4 mr-1"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                                >
                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                            </svg>
                            {post.comments.length}
                            </span>
                        </div>
                        </div>
                    </div>
                    </div>
                </Link>
            ))}
        </div>
    </>
  );
}
