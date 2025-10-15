import { createClient } from "next-sanity";
import { dataset, projectId } from "../env";
import { defineLive } from "next-sanity/live";

// Read-only client for fetching data
export const client = createClient({
	projectId,
	dataset,
	apiVersion: "v2025-03-04",
	stega: { studioUrl: "/studio" },
	useCdn: true,
});

export const writeClient = createClient({
	projectId,
	dataset,
	apiVersion: "v2025-03-04",
	token: process.env.NEXT_PRIVATE_SANITY_TOKEN,
	stega: { studioUrl: "/studio" },
	useCdn: false,
});

const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
	throw new Error("Missing SANITY_API_READ_TOKEN");
}

export const { sanityFetch, SanityLive } = defineLive({
	client,
	serverToken: token,
	browserToken: token,
});
