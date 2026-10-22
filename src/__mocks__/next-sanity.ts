import { jest } from "@jest/globals";
export { createClient } from "../sanity/__mocks__/client";
export const { sanityFetch, SanityLive } = {
  sanityFetch: jest.fn(),
  SanityLive: () => null,
};
