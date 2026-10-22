import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, jest, test } from "@jest/globals";
import SocialShare from "./SocialShare";

test("confirms a copied link only after clipboard succeeds", async () => {
  const writeText = jest.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
  render(<SocialShare url="https://example.com/post/guide" title="A guide" />);
  fireEvent.click(screen.getByRole("button", { name: "Copy article link" }));
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Link copied"));
  expect(writeText).toHaveBeenCalledWith("https://example.com/post/guide");
});

test("explains clipboard failure and retains an accessible share option", async () => {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: jest.fn<() => Promise<void>>().mockRejectedValue(new Error("Denied")) },
  });
  render(<SocialShare url="https://example.com/post/guide" title="A guide" />);
  fireEvent.click(screen.getByRole("button", { name: "Copy article link" }));
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Copy the URL from your address bar"));
  expect(screen.getByRole("button", { name: "Share on WhatsApp" })).toBeVisible();
});
