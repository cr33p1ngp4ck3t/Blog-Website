import { fireEvent, render, screen } from "@testing-library/react";
import { expect, jest, test } from "@jest/globals";
import type { Post } from "@/sanity/types";
jest.mock("../../sanity/lib/image", () => ({ urlFor: jest.fn() }));

const ArticleFeed = jest.requireActual<typeof import("./ArticleFeed")>("./ArticleFeed").default;

const posts = Array.from({ length: 8 }, (_, index) => ({
  _id: `post-${index}`,
  _updatedAt: "2026-10-22T00:00:00Z",
  title: `Guide ${index}`,
  slug: { current: `guide-${index}` },
  excerpt: "A practical guide.",
  categories: [{ _id: "new-topic", title: "Budgeting", slug: { current: "budgeting" } }],
  publishedAt: `2026-10-${String(index + 1).padStart(2, "0")}T00:00:00Z`,
  readingTime: index + 1,
  body: [],
} satisfies Post));

test("discovers topics from content and resets pagination when sorting", () => {
  render(<ArticleFeed posts={posts} />);
  fireEvent.click(screen.getByRole("button", { name: "Budgeting" }));
  expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(6);
  expect(screen.getAllByRole("heading", { level: 3 })[0]).toHaveTextContent("Guide 7");
  fireEvent.click(screen.getByRole("button", { name: "More good reads" }));
  expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(8);
  fireEvent.change(screen.getByLabelText("Sort stories"), { target: { value: "quickest" } });
  expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(6);
  expect(screen.getAllByRole("heading", { level: 3 })[0]).toHaveTextContent("Guide 0");
  expect(posts[0].title).toBe("Guide 0");
});

test("does not offer empty topics when no stories are available", () => {
  render(<ArticleFeed posts={[]} />);
  expect(screen.getByRole("status")).toBeVisible();
  expect(screen.queryByRole("button", { name: "Saving money" })).toBeNull();
  expect(screen.queryByRole("button", { name: "More good reads" })).toBeNull();
});
