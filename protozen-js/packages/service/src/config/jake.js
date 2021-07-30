// @flow
/* global task jake */

import path from "path";
import Debug from "debug";
import { exec } from "@protozen/config";

const info = Debug("protozen:info:jake");

const rootD = path.resolve(__dirname, "..", "..");

task("default", () => {
  info("Service namespace: service:test, more help with service:help");
});

task("help", () => {
  info(`\
Service namespace:

jake service:help       print this help

  `);
});

task("rescript", async () => {
  await exec(
    `cd ${rootD};
    \`yarn bin rescript\` \
        build \
        -with-deps \
    `
  );
});

task("dev", ["rescript-all"], async () => {
  (jake.Task["service:dev"]: Object).startTime = 10 ** 14; // avoid timeout
  await jake.Task["rescript-watch"].invoke();
});
