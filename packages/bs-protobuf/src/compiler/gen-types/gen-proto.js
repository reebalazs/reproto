import { pbjs } from "protobufjs/cli";
import fs from "fs";
import { emitTypes } from "./emit-types";
import { Resolver } from "./resolver";

export function genProto(filenames, includes, output) {
  return new Promise((resolve, reject) => {
    pbjs.main(
      [
        "-t",
        "static-module",
        "-w",
        "commonjs",
        "--no-verify",
        "--no-convert",
        "--no-comments",
        "-o",
        output,
      ].concat(
        // We generate commonjs here because of more universal usage.
        // Possible options that work would be:
        //
        // es6:
        // ["-t", "static-module", "--es6", "-w",  "es6", ...]
        // commonjs:
        // ["-t", "static-module", "-w", "commonjs", ...]
        includes.reduce((a, path) => a.concat("-p", path), []),
        filenames
      ),
      function (err, txt) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

export function genProtoData(filenames, includes) {
  return new Promise((resolve, reject) => {
    pbjs.main(
      ["-t", "json"].concat(
        includes.reduce((a, path) => a.concat("-p", path), []),
        filenames
      ),
      function (err, json) {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(json));
        }
      }
    );
  });
}

export async function genTypes(
  filenames,
  includes,
  protoJsPath,
  output,
  withMake2
) {
  const data = await genProtoData(filenames, includes);
  const resolver = new Resolver(data, { protoJsPath, withMake2 });
  const stream = fs.createWriteStream(output);
  await new Promise((resolve, reject) => {
    stream.once("open", function (fd) {
      try {
        emitTypes(stream, resolver);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  });
  stream.close();
}
