export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/tests/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@mui|@babel|@emotion|@reduxjs|@dnd-kit)/)',
  ],
  testMatch: ['<rootDir>/src/tests/**/*.test.{js,jsx}'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',
    '!src/tests/**',
  ],
  injectGlobals: true,
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/src'],
};
