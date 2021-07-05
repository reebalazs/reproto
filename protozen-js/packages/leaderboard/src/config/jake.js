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

task("rescript", async () => {
  await exec(
    `cd ${rootD};
    \`yarn bin rescript\` \
        build \
        -with-deps \
    `
  );
});

task("dev", "rescript", async () => {
  const configFile = path.join(rootD, "src", "config", "webpack.config.js");
  exec(
    `cd ${rootD};
    \`yarn bin webpack\` \
        serve \
       --config ${configFile} \
       --progress \
    `
  );
  jake.Task["rescript-watch"].invoke();
});
