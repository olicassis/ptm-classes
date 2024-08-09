import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  displayName: 'utils',
  testMatch: ['<rootDir>/src/tests/**/?(*.)+(spec|test).ts?(x)'],
  setupFiles: ['<rootDir>/src/tests/mocks/setMocks.ts'],
}
export default config
