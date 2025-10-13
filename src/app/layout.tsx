import type { Metadata } from "next";
import "./styles/globals.css";
import Header from "./components/header";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import Footer from "./components/footer";

export const metadata: Metadata = {
	title: {
		default: "FinAid Hub | Your Trusted Guide to Financial Stability",
		template: "%s | FinAid Hub",
	},
	description:
		"Your ultimate resource for understanding and applying for financial assistance programs, managing debt, and finding practical ways to save money.",
	openGraph: {
		title: "FinAid Hub",
		description: "Your trusted guide to financial stability.",
		url: "https://go-blogable.vercel.app/",
		siteName: "FinAid Hub",
		images: [
			{
				url: "/og-image.png", // To be created
				width: 1200,
				height: 630,
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "FinAid Hub",
		description: "Your trusted guide to financial stability.",
		images: ["/og-image.png"], // To be created
	},
};

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} antialiased dark:bg-[#101318] text-[#101318] dark:text-[#dfeff9] scroll-smooth`}
			>
				<Header />
				{children}
				<Analytics />
				<Footer />
			</body>
		</html>
	);
}
