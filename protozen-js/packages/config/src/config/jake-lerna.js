// @flow
/* global task */

import Debug from "debug";
import path from "path";
import { exec } from "..";

const info = Debug("protozen:info:jake-lerna");
const debug = Debug("protozen:debug:jake-lerna");

const configD = path.resolve(__dirname, "..", "..");
const rootD = path.resolve(configD, "..");

task("bootstrap", async () => {
  await exec(
    `cd ${rootD};
    \`yarn bin lerna\` \
      bootstrap \
    `
  );
});

task("build", ["link"], async () => {
  await exec(
    `cd ${rootD};
    \`yarn bin lerna\` \
      run build \
    `
  );
});

task("publish", ["build"], async (...args) => {
  await exec(
    `cd ${rootD};
    \`yarn bin lerna\` \
      publish \
      --conventional-commits \
      --changelog-preset=eslint \
      ${args.join(" ")} \
    `
  );
});

task("version", ["build"], async (...args) => {
  await exec(
    `cd ${rootD};
    \`yarn bin lerna\` \
      version \
      --conventional-commits \
      --changelog-preset=eslint \
      ${args.join(" ")} \
    `
  );
});

task("link", async () => {
  await exec(
    `cd ${rootD};
    \`yarn bin lerna\` \
      exec --parallel yarn link \
    `
  );
});

task("unlink", async () => {
  await exec(
    `cd ${rootD};
    \`yarn bin lerna\` \
      exec --parallel --bail=false yarn unlink \
    `
  );
});
