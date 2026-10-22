import "server-only";
import { client } from "./client";

export const writeClient = client.withConfig({
  token: process.env.NEXT_PRIVATE_SANITY_TOKEN,
  useCdn: false,
});
