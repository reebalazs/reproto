// @flow
/* global task, jake */

import path from "path";
import Debug from "debug";
import { exec } from "@protozen/config";

const info = Debug("protozen:info:jake");

const rootD = path.resolve(__dirname, "..", "..");

task("default", () => {
  info(
    "get-schwifty namespace: get-schwifty:dev, more help with get-schwifty:help"
  );
});

task("help", () => {
  info(`\
Web namespace:

jake get-schwifty:dev        start development server
jake get-schwifty:help       print this help

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
  (jake.Task["get-schwifty:dev"]: Object).startTime = 10 ** 14; // avoid timeout
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
