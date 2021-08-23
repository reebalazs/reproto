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
      emitPrologue(stream, data, protoJsPath);
      emitPackage(stream, data, protoJsPath);
      emitEpilogue(stream, data, protoJsPath);
      resolve();
    });
  });
  stream.close();
}

function lookupFrom(data: Object, splitPath: Array<string>) {
  if (splitPath.length === 0) {
    return data;
  } else if (data.nested) {
    const name = splitPath.shift();
    const nextData = data.nested[name];
    if (nextData) {
      return lookupFrom(data.nested[name], splitPath);
    }
  }
}

// function isProto2Required(field: Object): boolean {
//   return field.rule && field.rule === "required";
// }

function isProto3Optional(field: Object): boolean {
  return field.options && field.options["proto3_optional"] === true;
}

function emitPrologue(stream: Object, dataRoot: Object, protoJsPath: string) {
  stream.write(`\
type protoJs = unit
`);
  emitProtoModuleDirective(stream, protoJsPath);
  stream.write(`@val external protoJs: protoJs = "default"
type serviceRoot
@module("@protozen/service") external _createServiceRoot: _ => serviceRoot = "createServiceRoot"
let createServiceRoot = () => _createServiceRoot(protoJs)
`);
}

function mapFieldType(
  field: Object,
  lookup: Function
): { type: string, name: string, fieldAccessor: string } {
  const fieldType = field["type"];
  const fieldRule = field["rule"];
  let type;
  let name;
  let fieldAccessor;
  let isRepeated;
  if (!fieldRule || fieldRule === "required") {
    // nothing to do, handle the same for now
    fieldAccessor = "Field";
  } else if (fieldRule === "repeated") {
    isRepeated = true;
    fieldAccessor = "MapField";
  } else {
    throw new Error(`Field rule not supported [${fieldRule}]`);
  }
  const result = {
    string: "string",
    int32: "int",
    int64: "int64",
  }[fieldType];
  if (result !== undefined) {
    type = fieldType;
    name = result;
  } else {
    // enum or message type
    const data = lookup(fieldType);
    if (!data) {
      throw new Error(`Field type not found [${fieldType}]`);
    }
    if (data.values) {
      type = "enum";
    } else if (data.fields) {
      type = "message";
    } else {
      throw new Error(`Field type not supported [${fieldType}]`);
    }
    name = `${fieldType}.t`;
  }
  if (isRepeated) {
    name = `array<${name}>`;
    if (isProto3Optional(field)) {
      throw new Error(
        `Field cannot be repeated and optional [${(field, name)}]`
      );
    }
  } else if (isProto3Optional(field)) {
    // proto3 optional: option<'a>
    // proto3 non-optional: 'a
    // proto2: 'a
    name = `option<${name}>`;
  }
  return { type, name, fieldAccessor };
}

function defaultFieldValue(field: Object, lookup: Function) {
  if (field["rule"] === "repeated") {
    // repeated field
    return "=[]";
  }
  if (isProto3Optional(field)) {
    // proto3: default for option
    return "=None";
  } else {
    // Default values
    // proto2: optionals
    // proto2: required field, allow default in make.
    // proto3: non-optionals
    // XXX TBD handle proto2 defaults
    const fieldType = field["type"];
    const result = {
      string: '""',
      int32: "0",
      int64: 'Int64.of_string("0")',
    }[fieldType];
    if (result !== undefined) {
      return `=${result}`;
    } else {
      // enum or message type
      const data = lookup(fieldType);
      if (!data) {
        throw new Error(`Field type not found [${fieldType}]`);
      }
      if (data.values) {
        // enum
        return `=${fieldType}.${Object.keys(data.values)[0]}`;
      } else if (data.fields) {
        // message
        return `=${fieldType}.make()`;
      } else {
        throw new Error(`Unsupported field type [${fieldType}]`);
      }
    }
  }
}

function* iterRealFieldNames(data: Object): Generator<Object, void, void> {
  for (const fieldName in data.fields) {
    if (!data._oneofStructuralFieldNames[fieldName]) {
      yield fieldName;
    }
  }
}

function* iterOneofFieldNames(data: Object): Generator<Object, void, void> {
  if (data.oneofs) {
    for (const fieldName in data.oneofs) {
      if (fieldName.charAt(0) !== "_") {
        yield fieldName;
      }
    }
  }
}

function emitFieldParameters(
  stream: Object,
  data: Object,
  lookup: Function,
  indent
) {
  for (const fieldName of iterRealFieldNames(data)) {
    const field = data.fields[fieldName];
    stream.write(
      `~${decapitalize(fieldName)}${defaultFieldValue(field, lookup)}, `
    );
  }
  for (const fieldName of iterOneofFieldNames(data)) {
    stream.write(
      `~${decapitalize(fieldName)}=Oneof.${capitalize(fieldName)}.None, `
    );
  }
  stream.write(`()`);
}

function emitFieldRecord(
  stream: Object,
  data: Object,
  lookup: Function,
  indent
) {
  stream.write(`{`);
  for (const fieldName of iterRealFieldNames(data)) {
    const decapitalizedFieldName = decapitalize(fieldName);
    stream.write(`${decapitalizedFieldName}: ${decapitalizedFieldName}, `);
  }
  for (const fieldName of iterOneofFieldNames(data)) {
    const decapitalizedFieldName = decapitalize(fieldName);
    stream.write(`${decapitalizedFieldName}: ${decapitalizedFieldName}, `);
  }
  stream.write(`}`);
}

function patchName(name) {
  if (name === "public") {
    // mangle "public" package id to work before the annotation has run
    return "public_";
  } else {
    return name;
  }
}

function emitScopeDirective(stream: Object, packageName: string) {
  const splitPath = packageName.split(".");
  // take off the name from the end
  splitPath.pop();
  if (splitPath.length > 0) {
    stream.write(`@scope(`);
    if (splitPath.length > 1) {
      stream.write(`(`);
      for (const segment of splitPath) {
        stream.write(`"${patchName(segment)}", `);
      }
      stream.write(`)`);
    } else {
      stream.write(`"${patchName(splitPath[0])}"`);
    }
    stream.write(`) `);
  }
}

function emitEnum(
  stream: Object,
  name,
  data,
  packageName,
  protoJsPath: string,
  indent
) {
  stream.write(`\
${" ".repeat(indent)}module ${capitalize(name)} = {
${" ".repeat(indent)}  type t =
`);
  for (const enumName in data.values) {
    stream.write(`\
${" ".repeat(indent)}    | ${capitalize(enumName)}
`);
  }
  stream.write(`\
${" ".repeat(indent)}}
`);
}

function emitOneofModule(
  stream: Object,
  data: Object,
  lookup: Function,
  packageName,
  protoJsPath: string,
  indent
) {
  stream.write(`\
${" ".repeat(indent)}module Oneof = {
`);
  for (const oneofFieldName of iterOneofFieldNames(data)) {
    stream.write(`\
${" ".repeat(indent)}  module ${capitalize(oneofFieldName)} = {
${" ".repeat(indent)}    type t =
`);
    const oneofFieldNames = data.oneofs[oneofFieldName].oneof;
    for (const fieldName of oneofFieldNames) {
      const field = data.fields[fieldName];
      stream.write(`\
${" ".repeat(indent)}      | ${capitalize(fieldName)}(${
        mapFieldType(field, lookup).name
      })
`);
      data._oneofStructuralFieldNames[fieldName] = true;
    }
    stream.write(`\
${" ".repeat(indent)}      | None
${" ".repeat(indent)}    let choices = (`);
    for (const fieldName of oneofFieldNames) {
      const field = data.fields[fieldName];
      stream.write(`("${mapFieldType(field, lookup).type}", "${fieldName}"), `);
    }
    if (oneofFieldNames.length === 1) {
      // there is no 1-tuples, workaround with terminator
      stream.write(`("", ""), `);
    }
    stream.write(`)
${" ".repeat(indent)}    let convert = ProtoTypeSupport.Convert.oneof(choices)
${" ".repeat(indent)}  }
`);
  }
  stream.write(`\
${" ".repeat(indent)}}
`);
}

function emitMessageClass(
  stream: Object,
  name,
  data,
  lookup: Function,
  packageName,
  protoJsPath: string,
  indent
) {
  const nextLookup = (name: string) =>
    lookupFrom(data, name.split(".")) || lookup(name);
  stream.write(`\
${" ".repeat(indent)}module ${capitalize(name)} = {
`);
  if (data.nested) {
    emitPackage(stream, data, protoJsPath, nextLookup, packageName, indent + 2);
  }
  // annotation to cache the structural field names in this class
  data._oneofStructuralFieldNames = {};
  if (data.oneofs) {
    emitOneofModule(stream, data, lookup, packageName, protoJsPath, indent + 2);
  }
  stream.write(`\
${" ".repeat(indent)}  type t = {
`);
  for (const fieldName of iterRealFieldNames(data)) {
    const field = data.fields[fieldName];
    stream.write(`\
${" ".repeat(indent)}    @as("${decapitalize(fieldName)}") ${fieldName}: ${
      mapFieldType(field, nextLookup).name
    },
`);
  }
  for (const fieldName of iterOneofFieldNames(data)) {
    stream.write(`\
${" ".repeat(indent)}    @as("${decapitalize(
      fieldName
    )}") ${fieldName}: Oneof.${capitalize(fieldName)}.t,
`);
  }
  stream.write(`\
${" ".repeat(indent)}  }
${" ".repeat(indent)}  let make = (`);
  emitFieldParameters(stream, data, nextLookup, indent);
  stream.write(`) => `);
  emitFieldRecord(stream, data, nextLookup, indent);
  stream.write(`
${" ".repeat(indent)}  `);
  emitProtoModuleDirective(stream, protoJsPath);
  stream.write(`@val `);
  emitScopeDirective(stream, packageName);
  stream.write(`external messageClass: _ = "${name}"
${" ".repeat(indent)}  let encode = v => {
${" ".repeat(indent)}    Js.Obj.empty()
`);
  for (const fieldName of iterRealFieldNames(data)) {
    const field = data.fields[fieldName];
    const mapper = mapFieldType(field, nextLookup);
    stream.write(`\
${" ".repeat(indent)}    ->ProtoTypeSupport.${
      mapper.fieldAccessor
    }.fromR("${decapitalize(fieldName)}", ProtoTypeSupport.Convert.${
      mapper.type
    }, v)
`);
  }
  for (const fieldName of iterOneofFieldNames(data)) {
    stream.write(`\
${" ".repeat(indent)}    ->ProtoTypeSupport.Field.fromR("${decapitalize(
      fieldName
    )}", Oneof.${capitalize(fieldName)}.convert, v)
`);
  }
  stream.write(`\
${" ".repeat(indent)}    ->ProtoTypeSupport.encode(messageClass)
${" ".repeat(indent)}  }
${" ".repeat(
  indent
)}  let verify = (v: t) => ProtoTypeSupport.verify(v, messageClass)
${" ".repeat(indent)}  let decode = (b): t => {
${" ".repeat(indent)}    let m = ProtoTypeSupport.decode(b, messageClass)
${" ".repeat(indent)}    make()
`);
  for (const fieldName of iterRealFieldNames(data)) {
    const field = data.fields[fieldName];
    const mapper = mapFieldType(field, nextLookup);
    stream.write(`\
${" ".repeat(indent)}    ->ProtoTypeSupport.${
      mapper.fieldAccessor
    }.toR("${decapitalize(fieldName)}", ProtoTypeSupport.Convert.${
      mapper.type
    }, m)
`);
  }
  for (const fieldName of iterOneofFieldNames(data)) {
    stream.write(`\
${" ".repeat(indent)}    ->ProtoTypeSupport.Field.toR("${decapitalize(
      fieldName
    )}", Oneof.${capitalize(fieldName)}.convert, m)
`);
  }
  stream.write(`\
${" ".repeat(indent)}  }
${" ".repeat(indent)}}
`);
}

function emitService(
  stream: Object,
  name,
  data,
  protoJsPath,
  lookup: Function,
  packageName,
  indent
) {
  stream.write(`\
${" ".repeat(indent)}module ${capitalize(name)} = {
`);
  const nextLookup = (name: string) =>
    lookupFrom(data, name.split(".")) || lookup(name);
  for (const methodName in data.methods) {
    const method = data.methods[methodName];
    const requestData = nextLookup(method.requestType);
    stream.write(`\
${" ".repeat(indent)}  module ${capitalize(methodName)} = {
${" ".repeat(indent)}    @send external wrapped: (serviceRoot, ${capitalize(
      method.requestType
    )}.t) => Promise.t<${capitalize(method.responseType)}.t> = "${
      packageName ? packageName + "/" : ""
    }${decapitalize(methodName)}"
${" ".repeat(indent)}    module Request = ${capitalize(method.requestType)}
${" ".repeat(indent)}    module Response = ${capitalize(method.responseType)}
${" ".repeat(
  indent
)}    let call = (serviceRoot, request) => wrapped(serviceRoot, request)->ProtozenService.MethodWrapper.methodWrapper
${" ".repeat(indent)}    let make = (serviceRoot, `);
    emitFieldParameters(stream, requestData, nextLookup, indent);
    stream.write(`) => wrapped(serviceRoot, `);
    emitFieldRecord(stream, requestData, nextLookup, indent);
    stream.write(`)->ProtozenService.MethodWrapper.methodWrapper
${" ".repeat(indent)}  }
`);
  }
  stream.write(`\
${" ".repeat(indent)}  `);
  emitProtoModuleDirective(stream, protoJsPath);
  stream.write(`@val `);
  emitScopeDirective(stream, packageName);
  stream.write(`external serviceClass: _ = "${capitalize(name)}"
${" ".repeat(
  indent
)}  @module("@protozen/service") external _create: (serviceRoot, _, _, bool, bool) => serviceRoot = "createService"
${" ".repeat(
  indent
)}  let create = (serviceRoot, rpcImpl, requestDelimited, responseDelimited) =>
${" ".repeat(
  indent
)}    _create(serviceRoot, serviceClass, rpcImpl, requestDelimited, responseDelimited)
${" ".repeat(indent)}}
`);
}

function emitProtoModuleDirective(stream: Object, protoJsPath: string) {
  stream.write(`@module("${protoJsPath}") `);
}

function emitEpilogue(stream: Object, dataRoot: Object, protoJsPath: string) {}

function emitPackage(
  stream: Object,
  dataRoot: Object,
  protoJsPath: string,
  lookup: Function = (name: string) => lookupFrom(dataRoot, name.split(".")),
  prefix: string = "",
  indent: number = 0
) {
  const nextLookup = (name: string) =>
    lookupFrom(dataRoot, name.split(".")) || lookup(name);
  for (const name in dataRoot.nested) {
    const data = dataRoot.nested[name];
    const packageName = prefix !== "" ? `${prefix}.${name}` : name;
    if (data.values) {
      emitEnum(stream, name, data, packageName, protoJsPath, indent);
    } else if (data.fields) {
      emitMessageClass(
        stream,
        name,
        data,
        nextLookup,
        packageName,
        protoJsPath,
        indent
      );
    } else if (data.methods) {
      emitService(
        stream,
        name,
        data,
        protoJsPath,
        nextLookup,
        packageName,
        indent
      );
    } else if (data.nested) {
      stream.write(`\
${" ".repeat(indent)}module ${capitalize(packageName)} = {
`);
      emitPackage(
        stream,
        data,
        protoJsPath,
        nextLookup,
        packageName,
        indent + 2
      );
      stream.write(`${" ".repeat(indent)}}
`);
    }
  }
}