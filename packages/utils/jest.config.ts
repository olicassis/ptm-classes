import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  displayName: "utils",
  testMatch: ['<rootDir>/tests/**/?(*.)+(spec|test).ts?(x)'],
};
export default config;