// @flow
/* global jake task */

import path from "path";
import Debug from "debug";
import inspector from "inspector";
import { hello } from "@protozen/command";
import { exec } from "@protozen/config";

const info = Debug("protozen:info:jake");

const rootD = path.resolve(__dirname, "..", "..");

task("default", () => {
  info("Command namespace: command:hello, more help with command:help");
});

task("help", () => {
  info(`\
Command namespace:

jake command:hello                   say hello (used for testing)
jake command:help                    print this help

  `);
});

task("rescript-this", async () => {
  await exec(
    `cd ${rootD};
    \`yarn bin rescript\` \
        build \
        -with-deps \
    `
  );
});

task("dev", ["rescript-all"], async () => {
  (jake.Task["command:dev"]: Object).startTime = 10 ** 14; // avoid timeout
  await jake.Task["rescript-watch"].invoke();
});

function processArgs(
  find: string,
  args: Array<string>,
  pushArgs?: Array<string> = [],
  yes?: Array<string> | string,
  no?: Array<string> | string
): boolean {
  let found = false;
  while (true) {
    const pos = args.indexOf(find);
    if (pos == -1) {
      break;
    }
    args.splice(pos, 1);
    found = true;
  }
  let adding = found ? yes : no;
  if (adding !== undefined) {
    if (typeof adding === "string") {
      adding = [adding];
    }
    for (const arg of adding) {
      pushArgs.push(arg);
    }
  }
  return found;
}

async function runCommand(
  commandName: string,
  commandFunc: Function,
  args: Array<string>
) {
  const nodeOptions = [];
  const dev = processArgs("dev", args, nodeOptions, "--inspect-brk");
  const bin = processArgs("bin", args);
  if (bin) {
    await exec(
      `BIN=\`cd "${rootD}"; yarn bin ${commandName}\`
      NODE_OPTIONS="${nodeOptions.join(" ")}" $BIN ${args.join(" ")}
      `
    );
  } else {
    if (dev && process.env.DEV !== "true") {
      inspector.open();
      inspector.waitForDebugger();
    }
    await commandFunc(args);
  }
}

task("hello", async (...args) => {
  await runCommand("hello", hello, args);
});

task("promise-test", async (...args) => {
  // $FlowFixMe
  const promiseTest = require("../api/PromiseTest.bs").promiseTest;
  await runCommand("promise-test", promiseTest, args);
});

task("demo-server", async (...args) => {
  // $FlowFixMe
  const demoServer = require("../api/DemoServer.bs").demoServer;
  await runCommand("demo-server", demoServer, args);
});
