#! /usr/bin/env node
// Unhandled rejections should terminate with error status
process.on("unhandledRejection", (up) => {
  throw up;
});
require("../reproto-service-example/PromiseTest.bs.js").promiseTest();
