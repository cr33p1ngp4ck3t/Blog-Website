export const createClient = () => ({
  fetch: jest.fn(),
});

export const client = createClient();
