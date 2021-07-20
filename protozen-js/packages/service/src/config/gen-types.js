// @flow

import { pbjs } from "protobufjs/cli";
import fs from "fs";

export function genProto(
  filenames: Array<string>,
  includes: Array<string>,
  output: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    pbjs.main(
      ["-t", "static-module", "--es6", "-w", "es6", "-o", output, "-p"].concat(
        includes,
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

export function genProtoData(
  filenames: Array<string>,
  includes: Array<string>
): Promise<Object> {
  return new Promise((resolve, reject) => {
    pbjs.main(
      ["-t", "json", "-p"].concat(includes, filenames),
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

function capitalize(txt) {
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}

function decapitalize(txt) {
  return txt.charAt(0).toLowerCase() + txt.slice(1);
}

export async function genTypes(
  filenames: Array<string>,
  includes: Array<string>,
  protoJsPath: string,
  output: string
): Promise<void> {
  const data = await genProtoData(filenames, includes);
  const stream = fs.createWriteStream(output);
  await new Promise((resolve) => {
    stream.once("open", function (fd) {
      emitPrologue(stream);
      emitPackage(stream, data);
      emitEpilogue(stream, protoJsPath);
      resolve();
    });
  });
  stream.close();
}

function emitPrologue(stream: Object) {}

function mapFieldType(fieldType: string) {
  const result = {
    string: "string",
    int32: "int",
    // int64: "int64",
  }[fieldType];
  if (fieldType === undefined) {
    throw new Error(`Unsupported field type [${fieldType}]`);
  }
  return result;
}

function defaultFieldValue(fieldType: string) {
  const result = {
    string: '""',
    int32: "0",
    // int64: "0",
  }[fieldType];
  if (fieldType === undefined) {
    throw new Error(`Unsupported field type [${fieldType}]`);
  }
  return result;
}

function emitFieldParameters(stream: Object, fields: Object, indent) {
  for (const fieldName in fields) {
    const field = fields[fieldName];
    stream.write(
      `~${decapitalize(fieldName)}=${defaultFieldValue(field["type"])}, `
    );
  }
  stream.write(`()`);
}

function emitFieldRecord(stream: Object, fields: Object, indent) {
  stream.write(`{`);
  for (const fieldName in fields) {
    const decapitalizedFieldName = decapitalize(fieldName);
    stream.write(`${decapitalizedFieldName}: ${decapitalizedFieldName}, `);
  }
  stream.write(`}`);
}

function emitMessageClass(stream: Object, name, data, indent) {
  stream.write(`\
${" ".repeat(indent)}module ${capitalize(name)} = {
${" ".repeat(indent)}  type t = {
`);
  for (const fieldName in data.fields) {
    const field = data.fields[fieldName];
    stream.write(`\
${" ".repeat(indent)}    @as("${decapitalize(
      fieldName
    )}") ${fieldName}: ${mapFieldType(field["type"])},
`);
  }
  stream.write(`\
${" ".repeat(indent)}  }
${" ".repeat(indent)}  let make = (`);
  emitFieldParameters(stream, data.fields, indent);
  stream.write(`) => `);
  emitFieldRecord(stream, data.fields, indent);
  stream.write(`
${" ".repeat(indent)}}
`);
}

function emitService(
  stream: Object,
  name,
  data,
  packageName,
  dataRoot,
  indent
) {
  stream.write(`\
${" ".repeat(indent)}module ${capitalize(name)} = {
`);
  for (const methodName in data.methods) {
    const method = data.methods[methodName];
    // XXX request in same module. TBD lookup from other modules?
    const requestData = dataRoot.nested[method.requestType];
    stream.write(`\
${" ".repeat(indent)}  module ${capitalize(methodName)} = {
${" ".repeat(
  indent
)}    @send external wrapped: (ProtozenService.Connection.connection, ${capitalize(
      method.requestType
    )}.t) => Promise.t<${capitalize(method.responseType)}.t> = "${
      packageName ? packageName + "/" : ""
    }${decapitalize(methodName)}"
${" ".repeat(
  indent
)}    let call = (connection, request) => wrapped(connection, request)->ProtozenService.Connection.wrapMethod
${" ".repeat(indent)}    let make = (connection, `);
    emitFieldParameters(stream, requestData.fields, indent);
    stream.write(`) => wrapped(connection, `);
    emitFieldRecord(stream, requestData.fields, indent);
    stream.write(`)->ProtozenService.Connection.wrapMethod
${" ".repeat(indent)}  }
`);
  }
  stream.write(`\
${" ".repeat(indent)}}
`);
}

function emitEpilogue(stream: Object, protoJsPath) {
  stream.write(`\
type protoJs = unit
@module("${protoJsPath}") @val external protoJs: protoJs = "default"
`);
}

function emitPackage(
  stream: Object,
  dataRoot: Object,
  prefix: string = "",
  indent: number = 0
) {
  if (prefix) {
    stream.write(`\
${" ".repeat(indent - 2)}module ${capitalize(prefix)} = {
`);
  }
  for (const name in dataRoot.nested) {
    const data = dataRoot.nested[name];
    const packageName = prefix !== "" ? `${prefix}.${name}` : name;
    if (data.fields) {
      emitMessageClass(stream, name, data, indent);
    } else if (data.methods) {
      emitService(stream, name, data, packageName, dataRoot, indent);
    } else if (data.nested) {
      emitPackage(stream, data, packageName, indent + 2);
    }
  }
  if (prefix) {
    stream.write(`${" ".repeat(indent - 2)}}
`);
  }
}
