'use client'
import Link from "next/link";
import { useState, useEffect } from "react";

function useDarkMode() {
    const [darkTheme, setDarkTheme] = useState(false);

    return () => {
        setDarkTheme(!darkTheme);
        if (!darkTheme) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };
}

export default function Header() {
    // useEffect(() => {
    //     const navbar = document.querySelector(".navbar");

    //     const handleScroll = () => {
    //         if (window.scrollY > 50) {
    //             navbar.classList.add("scrolled");
    //         } else {
    //             navbar.classList.remove("scrolled");
    //         }
    //     };

    //     window.addEventListener("scroll", handleScroll);

    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);

    return (
        <div className="navbar bg-white dark:bg-transparent sticky top-0 z-50 transition-all duration-300 backdrop-blur dark:text-[#dfeff9]">
            <div className="flex justify-between items-center p-4 px-6">
                <div className="text-2xl font-bold">
                    <Link href="/">Blog</Link>
                </div>
                <div>
                    <div className="flex gap-3 items-center">
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>
                        <div className="theme-switch-container">
                            <label className="theme-slider" htmlFor="checkbox" onChange={useDarkMode()}> 
                                <input type="checkbox" id="checkbox" className='rounded-full' /> 
                                <div className="round slider"></div> 
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
