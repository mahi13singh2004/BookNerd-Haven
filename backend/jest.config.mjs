// This file will be renamed to jest.config.mjs
export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
