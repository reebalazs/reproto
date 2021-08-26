#! /usr/bin/env node
const cwd = require("path").resolve(__dirname, "..", "..", "..", "..");
require("@babel/register")({ cwd });
// Unhandled rejections should terminate with error status
process.on("unhandledRejection", (up) => {
  throw up;
});
require("../server/DemoServer.bs.js").demoServer();
