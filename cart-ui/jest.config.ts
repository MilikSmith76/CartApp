import type { Config } from 'jest';

import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  verbose: true,
};

export default createJestConfig(config);
