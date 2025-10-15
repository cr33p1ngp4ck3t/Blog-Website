"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Search from "./Search";
import { Menu, X } from "lucide-react";

/**
 * Header component that renders a navigational bar with links.
 *
 * - The navbar becomes sticky at the top of the page and changes appearance when scrolled.
 * - Includes links to the main content categories.
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

	const [menu, setMenu] = useState(false);

	return (
		<>
			{menu && (
				<div className="fixed inset-0 z-50 h-screen w-auto bg-white py-24 px-16">
					<X
						onClick={() => {
							setMenu((prev) => !prev);
						}}
					/>
					<div className="flex flex-col gap-6 font">
						<Link href="/category/government-assistance">Government Assistance</Link>
						<Link href="/category/financial-health">Financial Health</Link>
						<Link href="/category/home-savings">Home Savings</Link>
						<Link href="/deals">Top Deals</Link>
					</div>
				</div>
			)}
			<div className="navbar bg-white dark:bg-transparent sticky top-0 z-40 transition-all duration-300 shadow backdrop-blur dark:text-[#dfeff9] border-b border-gray-200 dark:border-gray-800">
				<div className="flex justify-between items-center p-4 px-6 max-w-7xl mx-auto">
					<div className="text-2xl font-bold">
						<Link href="/">FinAid Hub</Link>
					</div>
					<nav className="hidden md:block">
						<div className="flex gap-6 items-center font-medium">
							<Link href="/category/government-assistance">
								Government Assistance
							</Link>
							<Link href="/category/financial-health">Financial Health</Link>
							<Link href="/category/home-savings">Home Savings</Link>
							<Link href="/deals">Top Deals</Link>
							<Search />
						</div>
					</nav>
					<nav className="md:hidden flex items-center justify-center">
						<Menu onClick={() => setMenu((prev) => !prev)} />
					</nav>
				</div>
			</div>
		</>
	);
}
