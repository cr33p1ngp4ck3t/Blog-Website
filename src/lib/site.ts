export const siteUrl = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://go-blogable.vercel.app"
).replace(/\/$/, "");
export const siteDescription =
  "Make your money make sense. Practical guides to saving, financial assistance, debt, and a more affordable everyday life.";

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
