# FinAid Hub

An independent U.S. personal finance and assistance publication built with Next.js and Sanity. Articles include primary sources, practical takeaways, reader questions, and related reading. Search, topic filtering, a savings planner, savings comparisons, social sharing, and RSS support discovery and engagement.

## Run locally

Use Node.js 24.18 or newer and npm. Install dependencies with `npm ci`, then run `npm run dev`. The website is at `http://localhost:3000`; Sanity Studio is at `/studio`.

Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`. Set `NEXT_PUBLIC_BASE_URL` to the deployed website URL for canonical links, sharing, and RSS. `NEXT_PUBLIC_CONTACT_EMAIL` enables the editorial email link; `NEXT_PUBLIC_DISQUS_SHORTNAME` enables comments.

Sanity Studio requires its exact origin in the project's CORS settings with credentials allowed. If you preview on another port, add that origin through Sanity Manage; a dataset write token cannot update project CORS settings.

## Edit in Sanity Studio

- **Active articles / Drafts / Featured articles:** write and select guides. Article, Discovery & SEO, and Editorial tabs separate writing from publishing settings.
- **Review due / Needs sources:** maintain current, sourced information. Set Last fact-checked only after checking sources, and Next review due to schedule a review.
- **Archived articles:** restore an article by turning off Archive article and publishing. Archiving hides it from discovery while retaining its URL with an archive notice and `noindex` metadata.
- **Useful resources:** edit official links on `/deals`, adjust their display order, or archive a resource.
- **Categories / Authors:** maintain topic names and attribution. Only categories with active articles enter the public sitemap.

Posts support up to five key takeaways, eight reader questions, and three recommended next reads. Topic matches fill remaining recommendations. Future publication dates hold an article off the site until that time; cached content refreshes on subsequent requests after the revalidation interval, so publication is not instantaneous. Publishing content normally refreshes article and resource pages within the 60-second cache interval; RSS uses a one-hour interval.

Legacy views and deals schemas remain registered to preserve stored content, but are hidden from Studio navigation and the create menu. Use Vercel Analytics for traffic.

## Content publishing

`content/articles.json` contains the original six finance guides; `content/more-guides.json` adds six guides on savings accounts, sinking funds, credit reports, SNAP, LIHEAP, and irregular income. `content/resources.json` supplies official links. The four unrelated posts listed in `content/archived-posts.json` can be archived without deleting them.

Validate content without writing:

```powershell
node scripts/seed-content.mjs
```

Publish with a server-side `NEXT_PRIVATE_SANITY_TOKEN` in `.env.local`:

```powershell
node --env-file=.env.local scripts/seed-content.mjs --publish --archive-legacy
```

The script creates missing guides and resources, fills missing editorial fields and related references, and preserves existing article bodies and edits. It saves a snapshot in the system temporary directory before changing existing documents. Remove `--archive-legacy` to skip archiving. Reruns preserve documents matched by slug or resource URL, including drafts. Run one publishing process at a time. Never expose the write token through `NEXT_PUBLIC_*` variables.

Deploy the code changes to update the embedded Studio and website features; publishing content alone does not deploy application code. FAQ structured data mirrors the visible answers and does not guarantee rich search results or traffic growth.

## Verification

Run `npm run lint`, `npm run typecheck`, `npm test -- --runInBand`, and `npm run build`. Browser checks use `npm run test:e2e` against a server at `http://localhost:3000` and require Microsoft Edge. Set `PLAYWRIGHT_BASE_URL` to check another local port. Checks exercise seeded content, archives, resources, reader questions, sharing, discovery metadata, and mobile navigation.
