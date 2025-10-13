import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  const groqQuery = `*[_type == "post" && title match $query] {
    _id,
    title,
    slug
  }`;

  const results = await client.fetch(groqQuery, { query: `${query}*` });
  return NextResponse.json(results);
}
