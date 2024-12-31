"use client"
import React, {  useState, useEffect } from "react";
import { CardContent } from "./cardContent";


export default function PostCard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000)

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center fixed rounded-lg bg-white/80 bottom-0 text-black p-6 z-50 text-2xl font-bold h-screen w-screen">
          Fetching Posts...
        </div>
      ) : (
          <CardContent />
      )}
    </>
  );
}
