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

/**
 * Header component that renders a navigational bar with links and a dark mode toggle.
 * 
 * - The navbar becomes sticky at the top of the page and changes appearance when scrolled.
 * - Includes links to home, about, and contact pages.
 * - Contains a theme switcher to toggle between light and dark modes.
 */
export default function Header() {
    useEffect(() => {
        const navbar = document.querySelector(".navbar");

        const handleScroll = () => {
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add("scrolled");
                } else {
                    navbar.classList.remove("scrolled");
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="navbar bg-white dark:bg-transparent sticky top-0 z-[100] transition-all duration-300 backdrop-blur dark:text-[#dfeff9]">
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
