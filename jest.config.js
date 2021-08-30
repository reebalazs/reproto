const config = {
  verbose: false,
  rootDir: "./",
  testPathIgnorePatterns: ["/node_modules/", "/.cache/"],
  setupFiles: ["./jestSetup.js"],
  transformIgnorePatterns: ["node_modules/@glennsl/bs-test/"],
  collectCoverage: false, // unless explititly specified
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 70,
      statements: -1000,
    },
  },
};

module.exports = config;
