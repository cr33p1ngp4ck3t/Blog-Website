import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

const articles = JSON.parse(
  readFileSync(new URL("../content/articles.json", import.meta.url), "utf8"),
);
const categories = [
  {
    slug: "saving-money",
    title: "Saving money",
    description:
      "Small habits, realistic plans, and more room for the things that matter.",
  },
  {
    slug: "financial-health",
    title: "Financial health",
    description:
      "Understand credit, handle debt, protect your money, and build a stronger buffer.",
  },
  {
    slug: "government-assistance",
    title: "Financial assistance",
    description:
      "Clear routes to official U.S. food, housing, health, and utility support.",
  },
  {
    slug: "home-savings",
    title: "Everyday living",
    description:
      "Practical ways to make your home, groceries, and everyday spending go further.",
  },
];
assert.equal(
  new Set(articles.map((post) => post.slug)).size,
  articles.length,
  "Slugs must be unique",
);
for (const post of articles) {
  assert.match(post.slug, /^[a-z0-9-]+$/);
  assert.ok(categories.some((category) => category.slug === post.category));
  assert.ok(post.title && post.excerpt && post.seoDescription.length <= 160);
  assert.ok(
    post.sources.length &&
      post.sources.every((source) => new URL(source[1]).protocol === "https:"),
  );
  assert.ok(
    post.sections
      .flatMap((section) => section[1])
      .join(" ")
      .split(/\s+/).length >= 400,
    "Each article needs substantial content",
  );
}
if (!process.argv.includes("--publish")) {
  console.log(
    "Validated",
    articles.length,
    "articles. Add --publish to create only missing Sanity documents.",
  );
  process.exit(0);
}
assert.ok(
  process.env.NEXT_PRIVATE_SANITY_TOKEN,
  "Sanity write token is required",
);
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-10-14",
  token: process.env.NEXT_PRIVATE_SANITY_TOKEN,
  useCdn: false,
});
const existingCategories = await client.fetch(
  '*[_type == "category"]{_id, slug}',
);
const categoryRefs = {};
let transaction = client.transaction();
for (const category of categories) {
  const id =
    existingCategories.find((item) => item.slug?.current === category.slug)
      ?._id || "finaid-category-" + category.slug;
  categoryRefs[category.slug] = id;
  transaction = transaction.createIfNotExists({
    _id: id,
    _type: "category",
    title: category.title,
    slug: { _type: "slug", current: category.slug },
    description: category.description,
  });
}
const authorId = "finaid-editorial";
transaction = transaction.createIfNotExists({
  _id: authorId,
  _type: "author",
  name: "FinAid Hub editorial",
  slug: { _type: "slug", current: "finaid-editorial" },
  bio: [
    {
      _type: "block",
      _key: "bio",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "bio-span",
          text: "Practical money guides, researched from official sources. We explain everyday saving, credit, and financial assistance in plain language.",
          marks: [],
        },
      ],
    },
  ],
});
const existing = await client.fetch('*[_type == "post"]{"slug":slug.current}');
let added = 0;
for (const [index, article] of articles.entries()) {
  if (existing.some((post) => post.slug === article.slug)) {
    console.log("Preserved existing:", article.slug);
    continue;
  }
  const image = await client.assets.upload(
    "image",
    readFileSync(
      new URL("../public/images/" + article.image + ".jpg", import.meta.url),
    ),
    { filename: article.image + ".jpg" },
  );
  const body = [];
  let key = 0;
  function block(text, style = "normal", list = false) {
    return {
      _type: "block",
      _key: "b" + key++,
      style,
      markDefs: [],
      ...(list ? { listItem: "bullet", level: 1 } : {}),
      children: [{ _type: "span", _key: "span", text, marks: [] }],
    };
  }
  for (const [heading, paragraphs] of article.sections) {
    body.push(block(heading, "h2"));
    for (const paragraph of paragraphs)
      body.push(
        block(
          paragraph.startsWith("-") ? paragraph.slice(1) : paragraph,
          "normal",
          paragraph.startsWith("-"),
        ),
      );
  }
  const words = article.sections
    .flatMap((section) => section[1])
    .join(" ")
    .split(/\s+/).length;
  transaction = transaction.createIfNotExists({
    _id: "finaid-guide-" + article.slug,
    _type: "post",
    title: article.title,
    slug: { _type: "slug", current: article.slug },
    author: { _type: "reference", _ref: authorId },
    categories: [
      {
        _type: "reference",
        _ref: categoryRefs[article.category],
        _key: "category",
      },
    ],
    mainImage: {
      _type: "image",
      asset: { _type: "reference", _ref: image._id },
      alt: article.alt,
    },
    excerpt: article.excerpt,
    seoDescription: article.seoDescription,
    featured: !!article.featured,
    readingTime: Math.max(3, Math.ceil(words / 200)),
    body,
    views: 0,
    publishedAt: new Date(Date.now() - index * 60000).toISOString(),
    sources: article.sources.map(([title, url], i) => ({
      _key: "s" + i,
      title,
      url,
    })),
  });
  added++;
}
await transaction.commit();
console.log("Published", added, "new guides; existing content preserved.");
