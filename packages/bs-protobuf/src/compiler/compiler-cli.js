import { genProto } from "./gen-types";
import { genTypes } from "./gen-types";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import path from "path";
import chokidar from "chokidar";
import colors from "colors/safe";

export async function protoRes() {
  const options = yargs(hideBin(process.argv))
    .usage("$0 <filenames..> -o <output>")
    .positional("filenames", {
      type: "string",
      description: "Filenames to use for input, globbing allowed",
      required: true,
    })
    .option("includes", {
      alias: "i",
      type: "string",
      description: "Include directory path (repeatable)",
      required: false,
    })
    .option("output", {
      alias: "o",
      type: "string",
      description: "Filename.res to use for output",
      required: true,
    })
    .option("watch", {
      alias: "w",
      type: "boolean",
      description: "Watch mode",
      default: false,
    })
    .option("skipInitial", {
      alias: "s",
      type: "boolean",
      description: "Skip initial run (watch mode only)",
      default: false,
    })
    .option("verbose", {
      alias: "v",
      type: "boolean",
      description: "Verbose logging",
      default: false,
    })
    .option("withMake2", {
      alias: "m",
      type: "boolean",
      description: "Generate make2 helper function",
      default: false,
    })
    .strictOptions()
    .check(function (argv) {
      if (argv._.length === 0) {
        return "At least one source must be specified";
      }
      if (argv.skipInitial && !argv.watch) {
        return "--skip-initial only works with --watch";
      }
      return true;
    }).argv;
  options.filenames = options._;
  if (typeof options.includes === "undefined") {
    options.includes = [];
  } else if (typeof options.includes === "string") {
    options.includes = [options.includes];
  }
  await genCli(options);
}

const emphasized = (txt) => colors.yellow(colors.bold(txt));
const erroredThin = (txt) => colors.red(txt);
const errored = (txt) => colors.red(colors.bold(txt));

function makeJsOutput(output) {
  // The file is in the same directory, different extension
  return (
    output.substring(0, output.length - path.extname(output).length) +
    ".proto.js"
  );
}
export async function genCli({
  filenames,
  includes,
  output,
  watch,
  skipInitial,
  verbose,
  withMake2,
}) {
  const doIt = async () => {
    await genAll({
      filenames,
      includes,
      output,
      verbose,
      withMake2,
    });
  };
  const doItProtected = async () => {
    try {
      await doIt();
    } catch (e) {
      console.log(erroredThin("Proto compilation failed:"));
      console.log(errored(e.message));
    }
  };
  if (!skipInitial) {
    if (watch) {
      await doItProtected();
    } else {
      await doIt();
    }
  }
  if (watch) {
    const path = [].concat(filenames, includes);
    chokidar
      .watch(path, { ignoreInitial: true })
      .on("all", async (event, path) => {
        await doItProtected();
      });
  }
}

async function genAll({ filenames, includes, output, verbose, withMake2 }) {
  const jsOutput = makeJsOutput(output);
  const jsOutputRelative = "./" + path.basename(jsOutput);
  await genProto(filenames, includes, jsOutput);
  await genTypes(filenames, includes, jsOutputRelative, output, withMake2);
  if (verbose) {
    console.log(
      `Protores generated outputs ${emphasized(output)} and ${emphasized(
        jsOutput
      )}`
    );
  }
}
