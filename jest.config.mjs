import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

export default createJestConfig({
  testPathIgnorePatterns: ["/node_modules/", "/tests/browser/"],
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/sanity/lib/client$": "<rootDir>/src/sanity/__mocks__/client.ts",
    "next-sanity": "<rootDir>/src/__mocks__/next-sanity.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
});
