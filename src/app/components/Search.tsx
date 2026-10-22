"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search as SearchIcon, X } from "lucide-react";

interface Result {
  _id: string;
  title: string;
  slug: { current: string };
}
export default function Search({ onClose }: { onClose?: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [status, setStatus] = useState("");
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      const term = query.trim();
      if (!term) {
        setResults([]);
        setStatus("");
        return;
      }
      setStatus("Searching…");
      try {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(term)}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Search failed");
        const data: Result[] = await response.json();
        setResults(data);
        setStatus(
          data.length
            ? `${data.length} stories found`
            : "No stories found. Try savings, debt, or assistance.",
        );
      } catch {
        if (!controller.signal.aborted) {
          setResults([]);
          setStatus("Search is unavailable. Please try again.");
        }
      }
    }, 300);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);
  return (
    <dialog
      ref={dialog}
      className="search-dialog"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
      aria-labelledby="search-title"
    >
      <div className="search-heading">
        <h2 id="search-title">Find your next good move.</h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close search"
        >
          <X />
        </button>
      </div>
      <label className="search-input">
        <SearchIcon size={22} />
        <input
          autoFocus
          aria-label="Search articles"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try “savings” or “credit cards”…"
          type="search"
          maxLength={100}
        />
      </label>
      <p role="status" className="search-status">
        {status || "Practical answers, a few keystrokes away."}
      </p>
      <ul className="search-results">
        {results.map((post) => (
          <li key={post._id}>
            <Link href={`/post/${post.slug.current}`} onClick={onClose}>
              {post.title}
              <ArrowUpRight size={22} />
            </Link>
          </li>
        ))}
      </ul>
      {!query && (
        <div className="search-suggestions">
          {["savings", "scam", "assistance"].map((term) => (
            <button key={term} onClick={() => setQuery(term)}>
              {term} ↗
            </button>
          ))}
        </div>
      )}
    </dialog>
  );
}
