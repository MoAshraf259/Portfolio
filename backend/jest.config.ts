import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  moduleFileExtensions: ['ts', 'js'],
  collectCoverageFrom: ['src/**/*.ts', '!src/server.ts'],
  coverageDirectory: 'coverage',
  clearMocks: true,
  setupFiles: ['<rootDir>/tests/setup-env.ts'],
};

export default config;
