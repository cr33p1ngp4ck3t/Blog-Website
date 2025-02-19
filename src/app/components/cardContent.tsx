"use client";
import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "../../sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import React from 'react';

// Sample POSTS_QUERY with comments
const POSTS_QUERY = `*[ 
  _type == "post" 
  && defined(slug.current) 
] | order(publishedAt desc)[0...12]{
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

interface Props {
  id?: string;
  style?: React.CSSProperties;
}

export const CardContent: React.FC<Props> = ({ id, style }) => {
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  // const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
  // const [isLoading, setIsLoading] = useState(true);
  // const [loadTime, setLoadTime] = useState(0);

  // const handleLoadClick = async () => {
  //   setIsLoading(true);
  //   const startTime = Date.now();
  //   try {
  //     const duration = Date.now() - startTime;
  //     setLoadTime(duration);
  //     const timeoutDuration = Math.max(duration, 1000);
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, timeoutDuration);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchPosts();
      setPosts(result);
    };
    fetchData();
  }, []);

  const handleClick = async (postId: string) => {
    // Increment view count when a post is clicked
    await fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId })
    });

    const updatedPosts = await fetchPosts();
    setPosts(updatedPosts);
  };

  return (
    <>
      {/* {isLoading ? ( */}
        <div className="sm:flex gap-4 flex flex-wrap backdrop-blur-lg justify-center items-center " id={id} style={style} >
          {posts?.map((post) => (
            <div key={post._id} className="my-6 sm:w-[60%] md:w-[280px] backdrop-blur-lg justify-center items-center" >
              <div className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-white dark:bg-[#101318] dark:text-[#dfeff9] hover:transform hover:scale-[1.03] duration-300 shadow-sm hover:shadow-lg hover:shadow-slate-600">
                <div className="rounded-lg overflow-hidden  w-auto h-[260px] ">
                <Link
                  href={`/post/${post.slug.current}`}
                  onClick={() => handleClick(post._id)}
                >
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    height="1024"
                    width="280"
                    className="object-cover bg-center cursor-pointer w-auto h-auto"
                    priority
                  />
                </Link>
                </div>
                <div className="py-6 px-4 flex flex-col h-[160px] justify-between bg-white dark:bg-[#101318] text-[#101318] dark:text-[#dfeff9]">
                  <div>
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1 dark:text-[#dfeff9] hover:transform hover:scale-[1.02] duration-300 cursor-pointer">
                      {post.categories ? post.categories.map((category: { title: string }) => category.title).join(', ') : 'None'}
                    </h2>
                    <Link
                      href={`/post/${post.slug.current}`}
                      onClick={() => handleClick(post._id)}
                    >
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3 dark:text-[#dfeff9] cursor-pointer hover:transform hover:scale-[1.02] duration-300">
                        {post.title}
                      </h1>
                  </Link>
                  </div>
                  <div>
                    {/* <span className="hidden">{loadTime}</span> */}
                    <div className="flex items-center flex-wrap justify-between">
                    <Link
                      href={`/post/${post.slug.current}`}
                      onClick={() => handleClick(post._id)}
                    >
                      <div className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 hover:transform hover:scale-[1.05] cursor-pointer duration-300">
                        Learn More
                        <svg
                          className="w-4 h-4 ml-2  hover:transform hover:scale-[1.05] duration-300"
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
                    </Link>
                      <div className="flex items-center">
                        <span className="text-gray-400 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm py-1  hover:transform hover:scale-[1.2] duration-300 cursor-pointer">
                          <svg
                            className="w-4 h-4 mr-1  "
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
                          { post.views || 0}
                        </span>
                        <span className="mx-3">|</span>
                        <span className="text-gray-400 inline-flex items-center leading-none text-sm cursor-pointer hover:transform hover:scale-[1.2] duration-300">
                          <svg
                            className="w-4 h-4 mr-1 "
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
              </div>
            </div>
          ))}
        </div>
      {/* // ) : (
      //   <div className="flex justify-center items-center fixed rounded-lg bottom-0 right-0 text-white p-6 z-50 text-2xl font-bold h-screen w-screen">
      //     <Bg />
      //     <Image src="/loader.svg" alt="" width={30} height={30} />
      //   </div>
      // )} */}
    </>
  );
};
