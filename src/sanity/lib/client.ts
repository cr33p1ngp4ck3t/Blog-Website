import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Read-only client for fetching data
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
