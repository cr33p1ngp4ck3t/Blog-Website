import { createClient } from "next-sanity";
import { dataset, projectId } from "../env";
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
