import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createClient } from "@sanity/client";

const readContent = (name) => JSON.parse(readFileSync(new URL("../content/" + name, import.meta.url), "utf8"));
const articles = [...readContent("articles.json"), ...readContent("more-guides.json")];
const resources = readContent("resources.json");
const legacySlugs = readContent("archived-posts.json");
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
  assert.ok(post.excerpt.length <= 240 && post.alt);
  assert.ok((post.keyTakeaways || []).length <= 5);
  assert.ok((post.faqs || []).length <= 8);
  for (const faq of post.faqs || []) assert.ok(faq.question && faq.question.length <= 200 && faq.answer && faq.answer.length <= 1200);
  for (const slug of post.relatedSlugs || []) assert.ok(articles.some((article) => article.slug === slug), "Related guide must exist");
  assert.ok(!post.reviewedAt || /^\d{4}-\d{2}-\d{2}$/.test(post.reviewedAt));
  assert.ok((post.keyTakeaways || []).every((text) => text && text.length <= 240));
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
for (const resource of resources) assert.ok(resource.title && resource.organization && resource.description.length <= 300 && new URL(resource.url).protocol === "https:");
if (!process.argv.includes("--publish")) {
  console.log(
    "Validated",
    articles.length,
    "articles and", resources.length, "resources. Add --publish to create missing documents and fill missing editorial fields. Add --archive-legacy to archive the four inventoried legacy posts.",
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
  perspective: "raw",
});
const existingCategories = await client.fetch(
  '*[_type == "category" && !(_id in path("drafts.**"))]{_id, slug}',
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
const existing = await client.fetch('*[_type == "post"]');
const existingResources = await client.fetch('*[_type == "resource"]');
const snapshotPath = join(tmpdir(), "finaid-content-before-" + Date.now() + ".json");
writeFileSync(snapshotPath, JSON.stringify({ posts: existing, resources: existingResources }, null, 2));
console.log("Content snapshot:", snapshotPath);
let added = 0;
const editorialFields = (article) => ({
  ...(article.reviewedAt ? { reviewedAt: article.reviewedAt, reviewDueAt: "2027-01-22" } : {}),
  ...(article.keyTakeaways ? { keyTakeaways: article.keyTakeaways } : {}),
  ...(article.faqs ? { faqs: article.faqs.map((faq, index) => ({ _type: "faq", _key: "faq" + index, ...faq })) } : {}),
});
for (const [index, article] of articles.entries()) {
  const matches = existing.filter((post) => post.slug?.current === article.slug);
  if (matches.length) {
    const published = matches.find((post) => !post._id.startsWith("drafts."));
    if (published && Object.keys(editorialFields(article)).length) {
      transaction = transaction.patch(published._id, (patch) => patch.ifRevisionId(published._rev).setIfMissing(editorialFields(article)));
    }
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
  transaction = transaction.create({
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
    ...editorialFields(article),
    publishedAt: new Date(Date.now() - index * 60000).toISOString(),
    sources: article.sources.map(([title, url], i) => ({
      _key: "s" + i,
      title,
      url,
    })),
  });
  added++;
}
let archived = 0;
if (process.argv.includes("--archive-legacy")) {
  for (const post of existing.filter((post) => legacySlugs.includes(post.slug?.current) && post.archived !== true)) {
    transaction = transaction.patch(post._id, (patch) => patch.ifRevisionId(post._rev).set({ archived: true }));
    archived++;
  }
}
for (const [order, resource] of resources.entries()) {
  if (!existingResources.some((item) => item.url === resource.url)) transaction = transaction.create({ _type: "resource", ...resource, order, archived: false });
}
await transaction.commit();
const publishedPosts = await client.fetch('*[_type == "post" && !(_id in path("drafts.**"))]{_id, slug, relatedPosts}');
let relatedTransaction = client.transaction();
let relatedCount = 0;
for (const article of articles.filter((article) => article.relatedSlugs?.length)) {
  const post = publishedPosts.find((post) => post.slug?.current === article.slug);
  if (!post || post.relatedPosts) continue;
  const relatedPosts = article.relatedSlugs.map((slug, index) => {
    const related = publishedPosts.find((item) => item.slug?.current === slug);
    assert.ok(related, "Missing published related guide: " + slug);
    return { _type: "reference", _key: "related" + index, _ref: related._id };
  });
  relatedTransaction = relatedTransaction.patch(post._id, (patch) => patch.setIfMissing({ relatedPosts }));
  relatedCount++;
}
if (relatedCount) await relatedTransaction.commit();
console.log("Published", added, "new guides; archived", archived, "legacy documents; existing article bodies preserved.");
