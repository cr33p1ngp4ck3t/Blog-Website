import { fireEvent, render, screen, within } from "@testing-library/react";
import { test, expect } from "@jest/globals";
import Header from "./header";
import { ThemeProvider } from "./ThemeProvider";

test("provides keyboard accessible navigation that closes on selection", () => {
  render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>,
  );
  expect(
    screen.getByRole("link", { name: /FinAid Hub home/i }),
  ).toHaveAttribute("href", "/");
  fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
  expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  fireEvent.click(
    within(
      screen.getByRole("navigation", { name: "Mobile navigation" }),
    ).getByRole("link", { name: "All stories" }),
  );
  expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});
