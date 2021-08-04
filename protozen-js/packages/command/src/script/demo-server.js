#! /usr/bin/env node
// Unhandled rejections should terminate with error status
process.on("unhandledRejection", (up) => {
  throw up;
});
require("../api/DemoServer.bs.js").demoServer();
