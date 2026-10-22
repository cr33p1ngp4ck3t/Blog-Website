import { jest } from "@jest/globals";
export const createClient = () => ({
  fetch: jest.fn(),
});

export const client = createClient();
