"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Highlight from "./Highlight";

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

export default function Search({onClose}: {onClose?: () => void}) { // Add onClose prop
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setResults([]);
        if (onClose) {
          onClose(); // Call onClose when clicking outside
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const debounceSearch = setTimeout(async () => {
      if (query) {
        setLoading(true);
        const response = await fetch(`/api/search?query=${query}`);
        const data = await response.json();
        setResults(data);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 300); // 300ms debounce delay

    return () => clearTimeout(debounceSearch);
  }, [query]);

  return (
    <div className="relative" ref={searchRef}>
      <form>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for articles..."
          className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </form>
      {loading && <p className="mt-2 text-gray-600">Loading...</p>}
      {results.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-600">
          {results.map((post: Post) => (
            <li key={post._id}>
              <Link href={`/post/${post.slug.current}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <Highlight text={post.title} query={query} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
