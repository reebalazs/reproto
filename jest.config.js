const config = {
  verbose: false,
  rootDir: "./",
  testPathIgnorePatterns: ["/node_modules/", "/.cache/", "/protobuf.js"],
  setupFiles: ["./jestSetup.js"],
  transformIgnorePatterns: ["node_modules/@glennsl/bs-test/"],
  collectCoverage: false, // unless explititly specified
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/bs-rpc-axios/test/proto-res/",
    "/proto-demo/proto-res/",
  ],
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
