// @flow
/* global task, jake */

import path from "path";
import Debug from "debug";
import { exec } from "@protozen/config";

const info = Debug("protozen:info:jake");

const rootD = path.resolve(__dirname, "..", "..");

task("default", () => {
  info(
    "leaderboard namespace: leaderboard:dev, more help with leaderboard:help"
  );
});

task("help", () => {
  info(`\
Web namespace:

jake leaderboard:dev        start development server
jake leaderboard:help       print this help

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

task("build", ["rescript-build-all"], async () => {
  await exec(
    `cd ${rootD};
    \`yarn bin next\` \
        build \
    `
  );
});

task("dev", ["rescript-all"], async () => {
  (jake.Task["nextjs-web:dev"]: Object).startTime = 10 ** 14; // avoid timeout
  // const configFile = path.join(rootD, "src", "config", "webpack.config.js");
  exec(
    `cd ${rootD};
    \`yarn bin next\` \
      -p 3035 \
    `
  );
  jake.Task["rescript-watch"].invoke();
});
