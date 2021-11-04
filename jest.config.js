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
    "/bs-protobuf/test/proto-res/",
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 95,
      lines: 95,
      statements: -1000,
    },
  },
};

module.exports = config;
