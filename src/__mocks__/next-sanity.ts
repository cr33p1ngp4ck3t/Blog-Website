export const { sanityFetch, SanityLive } = {
  sanityFetch: jest.fn(),
  SanityLive: () => null,
};
export const createClient = jest.fn().mockReturnValue({
  fetch: jest.fn(),
});
