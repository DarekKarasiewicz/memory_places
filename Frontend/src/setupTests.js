import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  preset: 'ts-jest',
};
