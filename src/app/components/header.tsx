"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Search from "./Search";
import { Menu, X, Search as SearchIcon, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { client } from "@/sanity/lib/client";

interface Category {
	_id: string;
	title: string;
	slug: {
		current: string;
	};
}

/**
 * Header component that renders a navigational bar with links.
 *
 * - The navbar becomes sticky at the top of the page and changes appearance when scrolled.
 * - Includes links to the main content categories.
 */
export default function Header() {
	const [categories, setCategories] = useState<Category[]>([]);
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

		const fetchCategories = async () => {
			const query = `*[_type == "category"] {
				_id,
				title,
				slug
			}`;
			const data = await client.fetch(query);
			setCategories(data);
		};

		fetchCategories();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const [menu, setMenu] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	return (
		<>
			{menu && (
				<div className="fixed inset-0 z-50 h-screen w-auto bg-white py-24 px-16">
					<X
						onClick={() => {
							setMenu((prev) => !prev);
						}}
					/>
					<div className="flex flex-col gap-6 font my-6">
						<div className="relative">
							<button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2">
								Categories <ChevronDown />
							</button>
							{dropdownOpen && (
								<div className="flex flex-col gap-2 mt-2">
									{categories.map((category) => (
										<Link key={category._id} href={`/category/${category.slug.current}`}>
											{category.title}
										</Link>
									))}
								</div>
							)}
						</div>
						<Link href="/deals">Top Deals</Link>
						<Search />
						<ThemeToggle />
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
							<div className="relative">
								<button onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)} className="flex items-center gap-2">
									Categories <ChevronDown />
								</button>
								{dropdownOpen && (
									<div onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)} className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg">
										{categories.map((category) => (
											<Link key={category._id} href={`/category/${category.slug.current}`} className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
												{category.title}
											</Link>
										))}
									</div>
								)}
							</div>
							<Link href="/deals">Top Deals</Link>
							{searchOpen ? (
								<Search onClose={() => setSearchOpen(false)} />
							) : (
								<SearchIcon onClick={() => setSearchOpen(true)} />
							)}
							<ThemeToggle />
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
