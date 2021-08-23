// @flow
/* global jake, task, namespace */

import Debug from "debug";
import path from "path";
import supportsColor from "supports-color";
import "../../../../debug";
import { exec } from "..";
import { runCLI } from "@jest/core";
import "./jake-proto.js";
import inspector from "inspector";
import "./jake-lerna.js";
import chokidar from "chokidar";
import { Mutex } from "async-mutex";

const info = Debug("protozen:info:jake");
const debug = Debug("protozen:debug:jake");

if (process.env.DEV === "true") {
  inspector.open();
  inspector.waitForDebugger();
}

const rootD = path.resolve(__dirname, "..", "..", "..", "..");

task("default", () => {
  info(
    "Namespaces: web, get-schwifty, leaderboard, proto-demo, service, command. Targets: install, protoc, protodesc, lint, help"
  );
});

task("help", () => {
  info(`\
Namespaces:

web:                @protozen/web blank app
nextjs-web:         @protozen/nextjs-web blank app
get-schwifty:       @protozen/get-schwifty example app
leaderboard:        @protozen/leaderboard app
proto-demo:         @protozen/proto-demo app
service:            @protozen/service package
command:            @protozen/command package

Root targets:

jake install        install or update packages
jake protoc         compile the protos
jake protodebug     compile the proto files for debugging
jake lint           lint the code
jake test           test the code
jake help           print this help

jake protodesc      compile the proto descriptor (for debuggers)
jake protomap       compile the proto view mapping (for Charles Proxy)
jake eslint         eslint, part of lint
jake flow           flow, part of lint
jake jest           same as test

Namespaces help:

jake web            print help about the web namespace
jake nextjs-web     print help about the nextjs-web namespace
jake get-schwifty   print help about the get-schwifty namespace
jake leaderboard    print help about the leaderboard namespace
jake proto-demo     print help about the proto-demo namespace
jake service        print help about the service namespace
jake command        print help about the command namespace

  `);
});

task("install", async () => {
  await exec(
    `cd ${rootD};
    yarn install`
  );
});

task("eslint", async () => {
  await exec(
    `cd ${rootD};
    \`yarn bin eslint\` . ${supportsColor.stdout ? "--color" : ""} \
    `
  );
});

task("flow", async () => {
  await exec(
    `cd ${rootD};
     \`yarn bin flow\` check \
       --color=${supportsColor.stdout ? "always" : "never"} \
    `
  );
});

task("lint", () => {
  jake.Task["eslint"].invoke();
  jake.Task["flow"].invoke();
});

const jestConfigBase = {
  rootDir: rootD,
  colors: supportsColor.stdout,
  verbose: false,
  setupFiles: [path.resolve(__dirname, "jestSetup.js")],
  /// As of 2021-08-03, this causes a circular load problem with Babel.
  // Determining test suites to run...(node:88943) Warning: Accessing non-existent property 'fromObject' of module exports inside circular dependency
  // (Use `node --trace-warnings ...` to show where the warning was created)
  // jake aborted.
  // TypeError: /Users/ree/work/protozen/rescript-playground/protozen-js/packages/config/src/config/jestGlobalSetup.js: /Users/ree/work/protozen/rescript-playground/protozen-js/node_modules/convert-source-map/index.js: _convertSourceMap(...).fromObject is not a function
  //
  // globalSetup: path.resolve(__dirname, "jestGlobalSetup.js"),
  transformIgnorePatterns: ["node_modules/@glennsl/bs-test/"],
};

task("jest", async () => {
  const cwd = process.cwd();
  try {
    process.chdir(rootD);
    const jestConfig = {
      ...jestConfigBase,
      collectCoverage: true,
      coveragePathIgnorePatterns: [
        "/node_modules/",
        // Uncovered exceptions: proto
        "/service/dist/",
        // version check
        "/check-version",
        // Rescript glue
        "/service/src/api/create-connection",
      ],
      coverageThreshold: JSON.stringify({
        global: {
          branches: 50,
          functions: 65,
          lines: 65,
          statements: -1000,
        },
      }),
    };
    const result = await runCLI(jestConfig, [rootD]);
    if (!result.results.success) {
      throw new Error(`Tests failed`);
    }
  } finally {
    process.chdir(cwd);
  }
});

task("jest-watch", async () => {
  (jake.Task["jest-watch"]: Object).startTime = 10 ** 14; // avoid timeout
  const cwd = process.cwd();
  try {
    process.chdir(rootD);
    const jestConfig = {
      ...jestConfigBase,
      watch: true,
    };
    const result = await runCLI(jestConfig, [rootD]);
    if (!result.results.success) {
      throw new Error(`Tests failed`);
    }
  } finally {
    process.chdir(cwd);
  }
});

task("test", () => {
  jake.Task["jest"].invoke();
});

task("dev", () => {
  (jake.Task["dev"]: Object).startTime = 10 ** 14; // avoid timeout
  jake.Task["jest-watch"].invoke();
});

namespace("web", () => {
  require("../../../web/src/config/jake.js");
});

task("web", () => {
  jake.Task["web:default"].invoke();
});

namespace("nextjs-web", () => {
  require("../../../nextjs-web/src/config/jake.js");
});

task("nextjs-web", () => {
  jake.Task["nextjs-web:default"].invoke();
});

namespace("get-schwifty", () => {
  require("../../../get-schwifty/src/config/jake.js");
});

task("get-schwifty", () => {
  jake.Task["get-schwifty:default"].invoke();
});

namespace("leaderboard", () => {
  require("../../../leaderboard/src/config/jake.js");
});

task("leaderboard", () => {
  jake.Task["leaderboard:default"].invoke();
});

namespace("proto-demo", () => {
  require("../../../proto-demo/src/config/jake.js");
});

task("proto-demo", () => {
  jake.Task["proto-demo:default"].invoke();
});

namespace("service", () => {
  require("../../../service/src/config/jake.js");
});

task("service", () => {
  jake.Task["service:default"].invoke();
});

namespace("command", () => {
  try {
    require("../../../command/src/config/jake.js");
  } catch (err) {
    const commands = require("yargs").argv._;
    if (
      !(commands.length === 1 && ["install", "protoc"].includes(commands[0]))
    ) {
      info("Error importing command namespace. %s %O", err.message);
    }
  }
});

task("command", () => {
  jake.Task["command:default"].invoke();
});

const addTaskPromiseListeners = (
  t: Object,
  resolve: Function,
  reject: Function
) => {
  const onComplete = () => {
    t.removeListener("complete", onComplete);
    resolve();
  };
  t.addListener("complete", onComplete);
  const onError = (error: Error) => {
    t.removeListener("error", onError);
    reject(error);
  };
  t.addListener("error", onError);
};

const invokeWait = (t: Object) => {
  return new Promise((resolve, reject) => {
    addTaskPromiseListeners(t, resolve, reject);
    t.invoke();
  });
};

const executeWait = (t: Object) => {
  return new Promise((resolve, reject) => {
    addTaskPromiseListeners(t, resolve, reject);
    t.execute();
  });
};

task("rescript", async () => {
  await invokeWait(jake.Task["service:rescript-this"]);
  await invokeWait(jake.Task["proto-demo:rescript-this"]);
  await invokeWait(jake.Task["leaderboard:rescript-this"]);
  await invokeWait(jake.Task["get-schwifty:rescript-this"]);
  await invokeWait(jake.Task["nextjs-web:rescript-this"]);
  await invokeWait(jake.Task["command:rescript-this"]);
});

task("rescript-build-all", ["rescript"]);

task("rescript-all", async () => {
  try {
    await invokeWait(jake.Task["rescript"]);
  } catch (e) {}
});

const watch = (mutex: Object, waiting: Object, key: string, path, f) => {
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

task("rescript-watch", () => {
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
        await executeWait(jake.Task["proto-demo:rescript-this"]);
      }
    );
    watch(
      mutex,
      waiting,
      "leaderboard",
      ["packages/leaderboard/src/**/*.res"],
      async () => {
        await executeWait(jake.Task["leaderboard:rescript-this"]);
      }
    );
    watch(
      mutex,
      waiting,
      "get-schwifty",
      ["packages/get-schwifty/src/**/*.res"],
      async () => {
        await executeWait(jake.Task["get-schwifty:rescript-this"]);
        await executeWait(jake.Task["nextjs-web:rescript-this"]);
      }
    );
    watch(
      mutex,
      waiting,
      "nextjs-web",
      ["packages/nextjs-web/src/**/*.res"],
      async () => {
        await executeWait(jake.Task["nextjs-web:rescript-this"]);
      }
    );
    watch(
      mutex,
      waiting,
      "service",
      ["packages/service/src/**/*.res", "packages/service/dist/**/*.res"],
      async () => {
        await executeWait(jake.Task["service:rescript-this"]);
        await executeWait(jake.Task["proto-demo:rescript-this"]);
        await executeWait(jake.Task["command:rescript-this"]);
      }
    );
    watch(
      mutex,
      waiting,
      "command",
      ["packages/command/src/**/*.res"],
      async () => {
        await executeWait(jake.Task["command:rescript-this"]);
      }
    );
  });
});
