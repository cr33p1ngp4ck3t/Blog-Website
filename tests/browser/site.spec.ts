import { expect, test } from "@playwright/test";
import os from "node:os";
import path from "node:path";

test("homepage, topic filtering, and savings planner work together", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/FinAid Hub/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "More possibility",
  );
  await expect(page.locator(".articles-grid .post-card")).toHaveCount(6);
  await page.screenshot({
    path: path.join(os.tmpdir(), "finaid-desktop.png"),
    fullPage: true,
  });
  await page.getByRole("button", { name: "Saving money", exact: true }).click();
  await expect(page.locator(".articles-grid .post-card")).toHaveCount(1);
  await expect(page.locator(".articles-grid")).toContainText(
    "Your first $1,000",
  );
  await page.getByRole("button", { name: "All stories", exact: true }).click();
  await page.getByRole("button", { name: "More good reads" }).click();
  await expect(page.locator(".articles-grid .post-card")).toHaveCount(10);
  await page.getByLabel("Monthly contribution", { exact: true }).fill("250");
  await expect(page.getByTestId("savings-months")).toHaveText("4");
  await page.getByLabel("Already saved", { exact: true }).fill("1000");
  await expect(page.locator(".planner-result")).toContainText("Goal reached");
  expect(errors).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("search finds a real article and the reading page exposes sources and metadata", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Search articles" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog
    .getByRole("searchbox", { name: "Search articles" })
    .fill("emergency fund");
  await expect(
    dialog.getByRole("link", { name: /Your first \$1,000/ }),
  ).toBeVisible();
  await dialog.getByRole("link", { name: /Your first \$1,000/ }).click();
  await expect(page).toHaveURL(/build-your-first-emergency-fund/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Your first $1,000",
  );
  const toc = page.getByRole("navigation", { name: "On this page" });
  await toc.getByRole("link").first().click();
  await expect(page).toHaveURL(/#section-/);
  await expect(page.locator(".sources a")).toHaveCount(2);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /https:\/\/.*\/post\/build-your-first-emergency-fund/,
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "article",
  );
  const schemas = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const article = schemas
    .map((text) => JSON.parse(text))
    .find((data) => data["@type"] === "BlogPosting");
  expect(typeof article.image).toBe("string");
  expect(article.mainEntityOfPage["@id"]).toContain(
    "/post/build-your-first-emergency-fund",
  );
  await page.screenshot({
    path: path.join(os.tmpdir(), "finaid-article.png"),
    fullPage: true,
  });
});

test("mobile navigation, dark theme, and layout remain usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.screenshot({
    path: path.join(os.tmpdir(), "finaid-mobile.png"),
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Open menu" }).click();
  const navigation = page.getByRole("navigation", {
    name: "Mobile navigation",
  });
  await expect(navigation).toBeVisible();
  await navigation.getByRole("link", { name: "Find assistance" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Financial assistance",
  );
  await expect(navigation).toHaveCount(0);
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveClass("dark");
  await page.reload();
  await expect(page.locator("html")).toHaveClass("dark");
  await page.goto("/");
  await page.screenshot({
    path: path.join(os.tmpdir(), "finaid-dark-mobile.png"),
    fullPage: true,
  });
});

test("resources, comparison, missing stories, and discovery endpoints work", async ({
  page,
  request,
}) => {
  await page.goto("/compare");
  await expect(page.getByRole("table")).toBeVisible();
  await page
    .getByRole("button", { name: /Money market deposit account/ })
    .click();
  await expect(
    page.getByRole("columnheader", { name: "Money market deposit account" }),
  ).toBeVisible();
  await page.goto("/deals");
  await expect(page.locator(".resource-list .resource")).toHaveCount(6);
  await page.goto("/post/this-story-does-not-exist");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /find\s*your next move/,
  );
  expect((await request.get("/api/search")).status()).toBe(400);
  for (const postId of ["published-post", "drafts.secret-post"]) {
    expect(
      (await request.post("/api/views", { data: { postId } })).status(),
    ).toBe(404);
  }
  const results = await request.get("/api/search?query=scam");
  expect(results.status()).toBe(200);
  expect((await results.json()).length).toBeGreaterThan(0);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("build-your-first-emergency-fund");
  const feed = await request.get("/feed.xml");
  expect(feed.status()).toBe(200);
  expect(await feed.text()).toContain("<rss");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /studio/");
  expect((await request.get("/opengraph-image")).status()).toBe(200);
});
