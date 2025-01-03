"use client"
import React, {  useState } from "react";
import { CardContent } from "./cardContent";


export default function PostCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadTime, setLoadTime] = useState(0);

  const handleClick = async () => {
    setIsLoading(true); 

    const startTime = Date.now();  

    try {
      const duration = Date.now() - startTime
      setLoadTime(duration)
      const timeoutDuration = Math.max(duration, 1000)
      setTimeout(() => {
        setIsLoading(false);  
      }, timeoutDuration);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);  
    }
  }

  return (
    <>
        <div onClick={handleClick}>
        {isLoading && (
          <div className="flex justify-center items-center fixed rounded-lg bg-black/20 bottom-0 right-0 text-white p-6 z-50 text-2xl font-bold h-screen w-screen bg-dark">
            Fetching Posts... <span className="hidden">{loadTime}ms</span>
          </div>
        )}
        <CardContent />
      </div>
    </>
  );
}
