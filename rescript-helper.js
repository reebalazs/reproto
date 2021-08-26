import path from "path";
import chokidar from "chokidar";
import { Mutex } from "async-mutex";
import { spawn } from "child_process";

const rootD = path.resolve(__dirname);

async function exec(command) {
  const exitCode = await new Promise((resolve) => {
    spawn(command, {
      shell: true,
      stdio: "inherit",
    }).on("exit", resolve);
  });
  if (exitCode !== 0) {
    throw new Error(`exec exit code: ${exitCode}`);
  }
}

const watch = (mutex, waiting, key, path, f) => {
  waiting[key] = 0;
  chokidar
    .watch(path, {
      cwd: rootD,
    })
    .on("all", async (event, path) => {
      waiting[key]++;
      if (waiting[key] === 1) {
        await mutex.runExclusive(async () => {
          try {
            await f();
          } catch (e) {}
        });
      }
      waiting[key]--;
    });
};

async function rescriptThis(name) {
  const packageD = path.join(rootD, "packages", name);
  await exec(
    `cd ${packageD};
    \`yarn bin rescript\` \
        build \
        -with-deps \
    `
  );
}

export async function rescriptBuild() {
  await rescriptThis("bs-protobuf");
  await rescriptThis("proto-demo");
}

export async function rescriptDev() {
  process.env.RES_LOG = "info";
  return new Promise(() => {
    const mutex = new Mutex();
    const waiting = {};
    watch(
      mutex,
      waiting,
      "proto-demo",
      ["packages/proto-demo/src/**/*.res"],
      async () => {
        await rescriptThis("proto-demo");
      }
    );
    watch(
      mutex,
      waiting,
      "bs-protobuf",
      [
        "packages/bs-protobuf/src/**/*.res",
        "packages/bs-protobuf/__tests__/**/*.res",
      ],
      async () => {
        await rescriptThis("bs-protobuf");
        await rescriptThis("proto-demo");
      }
    );
  });
}
