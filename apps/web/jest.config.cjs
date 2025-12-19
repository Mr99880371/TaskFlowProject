/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    '^@taskflow/types$': '<rootDir>/../../packages/types/src',
    '^@taskflow/domain$': '<rootDir>/../../packages/domain/src',
    '^@taskflow/(.*)$': '<rootDir>/../../packages/$1/src',
  },
};
