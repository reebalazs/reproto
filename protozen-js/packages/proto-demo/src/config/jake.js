// @flow
/* global task, jake */

import path from "path";
import Debug from "debug";
import { exec } from "@protozen/config";

const info = Debug("protozen:info:jake");

const rootD = path.resolve(__dirname, "..", "..");

task("default", () => {
  info("proto-demo namespace: proto-demo:dev, more help with proto-demo:help");
});

task("help", () => {
  info(`\
Proto-demo namespace:

jake proto-demo:dev        start development server
jake proto-demo:help       print this help

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
  (jake.Task["proto-demo:dev"]: Object).startTime = 10 ** 14; // avoid timeout
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
