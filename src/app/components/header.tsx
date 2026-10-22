"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu, Search as SearchIcon, X } from "lucide-react";
import Search from "./Search";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/articles", label: "All stories" },
  { href: "/category/saving-money", label: "Save smarter" },
  { href: "/category/government-assistance", label: "Find assistance" },
  { href: "/about", label: "Our story" },
];
export default function Header() {
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="wordmark" aria-label="FinAid Hub home">
          <span className="brand-symbol" aria-hidden="true">
            f<span>↗</span>
          </span>
          FinAid<span className="wordmark-light">Hub</span>
          <span className="brand-dot">.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search articles"
          >
            <SearchIcon size={20} />
          </button>
          <ThemeToggle />
          <Link href="/#money-tool" className="header-cta">
            Make a plan <ArrowUpRight size={16} />
          </Link>
          <button
            className="icon-button menu-toggle"
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            aria-controls="mobile-navigation"
          >
            {menu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {menu && (
        <nav
          id="mobile-navigation"
          className="mobile-nav shell"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              onClick={() => setMenu(false)}
            >
              {link.label}
              <ArrowUpRight size={20} />
            </Link>
          ))}
          <Link href="/#money-tool" onClick={() => setMenu(false)}>
            Make a savings plan
            <ArrowUpRight size={20} />
          </Link>
        </nav>
      )}
      {searchOpen && <Search onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
