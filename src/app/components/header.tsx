'use client'
import Link from "next/link";
import { useState } from "react";

function useDarkMode() {
    const [darkTheme, setDarkTheme] = useState(false);

    return () => {
        setDarkTheme(!darkTheme);
        if (!darkTheme) {
        document.documentElement.classList.add('dark');
        } else {
        document.documentElement.classList.remove('dark');
        }
    }
}

export default function Header() {
    return (
        <div className="p-5 md:px-10 sm:px-10 w-full bg-[#dfeff9] text-[#101318] dark:bg-[#101318] dark:text-[#dfeff9] sticky top-0 z-50">
            <div className="flex justify-between items-center ">
                <div className="text-2xl font-bold"><Link href="/">Blog</Link></div>
                <div>
                    <div className="flex gap-3 items-center">
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>
                        <div className="theme-switch-container">
                            <label className="theme-slider" htmlFor="checkbox" onChange={useDarkMode()}> 
                                <input type="checkbox" id="checkbox" className='rounded-full' /> 
                                <div className="round slider" ></div> 
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}