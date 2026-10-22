import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("query")?.trim();
  if (!query || query.length > 100)
    return NextResponse.json(
      { error: "Enter a search of 1–100 characters." },
      { status: 400 },
    );
  try {
    const terms = query
      .split(/\s+/)
      .map((term) => term.replace(/[\\*?"']/g, "") + "*")
      .join(" ");
    const results = await client.fetch<
      { _id: string; title: string; slug: { current: string } }[]
    >(
      `*[_type == "post" && defined(slug.current) && (!defined(publishedAt) || publishedAt <= now()) && (title match $term || excerpt match $term || pt::text(body) match $term)] | order(publishedAt desc)[0...12]{_id, title, slug}`,
      { term: terms },
    );
    return NextResponse.json(results);
  } catch {
    return NextResponse.json(
      { error: "Search is temporarily unavailable." },
      { status: 503 },
    );
  }
}
