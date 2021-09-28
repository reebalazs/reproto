import { pbjs } from "protobufjs/cli";
import fs from "fs";
import { emitTypes } from "./emit-types";
import { Resolver } from "./resolver";

export function genProto(filenames, includes, output) {
  return new Promise((resolve, reject) => {
    pbjs.main(
      // es6:
      [
        "-t",
        "static-module",
        "--es6",
        "-w",
        "es6",
        "--no-verify",
        "--no-convert",
        "--no-comments",
        "-o",
        output,
      ].concat(
        // commonjs:
        // ["-t", "static-module", "-w", "commonjs", "--no-convert", "--no-comments", "-o", output].concat(
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

export async function genTypes(filenames, includes, protoJsPath, output) {
  const data = await genProtoData(filenames, includes);
  const resolver = new Resolver(data, protoJsPath);
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
