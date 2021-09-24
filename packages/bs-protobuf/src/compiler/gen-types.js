import { pbjs } from "protobufjs/cli";
import fs from "fs";

const bsProtobufPackage = "ReprotoBsProtobuf";

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

function capitalize(txt) {
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}

function decapitalize(txt) {
  return txt.charAt(0).toLowerCase() + txt.slice(1);
}

export async function genTypes(filenames, includes, protoJsPath, output) {
  const data = await genProtoData(filenames, includes);
  const resolver = new Resolver(data, protoJsPath);
  const stream = fs.createWriteStream(output);
  await new Promise((resolve) => {
    stream.once("open", function (fd) {
      emitPrologue(stream, resolver);
      emitPackage(stream, resolver);
      emitEpilogue(stream, resolver);
      resolve();
    });
  });
  stream.close();
}

export class Resolver {
  constructor(data, protoJsPath, chain = null, prefix = [], baseLevel = null) {
    this.data = data;
    this.protoJsPath = protoJsPath;
    this.chain = chain;
    this.prefix = prefix;
    // Base level is the length of prefix
    // when the forward lookup begins.
    this.baseLevel = baseLevel;
  }

  next(segment, initial) {
    const data = this.data.nested[segment];
    if (data) {
      let baseLevel = this.baseLevel;
      if (initial) {
        if (baseLevel != null) {
          // Use the minimum of the current prefix length and the
          // previous base level, as the start of the relative path
          baseLevel = Math.min(baseLevel, this.prefix.length);
        } else {
          // No base level yet, use the current prefix length
          baseLevel = this.prefix.length;
        }
      }
      return new Resolver(
        data,
        this.protoJsPath,
        this,
        this.prefix.concat(segment),
        baseLevel
      );
    }
    return couldNotResolve;
  }

  forwardLookupPath(path, initial) {
    if (path.length === 0) {
      return this;
    } else if (this.data.nested) {
      path = [].concat(path);
      const resolver = this.next(path.shift(), initial);
      if (resolver.data) {
        return resolver.forwardLookupPath(path);
      }
    }
    return couldNotResolve;
  }

  lookupPath(path) {
    let resolver = this.forwardLookupPath(path, true);
    if (!resolver.data && this.chain) {
      resolver = this.chain.lookupPath(path);
    }
    return resolver;
  }

  lookup(name) {
    return this.lookupPath(name.split("."));
  }

  get relativePath() {
    // The relative path starting from the base level
    // eg. if alpha.beta.gamma is looked up from alpha.epsilon,
    // then the base level is alpha, and the relative path
    // is Beta.Gamma.
    return this.prefix.slice(this.baseLevel).map(capitalize).join(".");
  }
}

export const couldNotResolve = new Resolver();

// function isProto2Required(field: Object): boolean {
//   return field.rule && field.rule === "required";
// }

function isProto3Optional(field) {
  return field.options && field.options["proto3_optional"] === true;
}

function emitPrologue(stream, resolver) {
  stream.write(`\
// Generated by protores from @reproto/bs-protobuf, PLEASE EDIT WITH CARE
type protoJs = unit
`);
  emitProtoModuleDirective(stream, resolver);
  stream.write(`@val external protoJs: protoJs = "default"
type serviceRoot
@module("@reproto/bs-protobuf") external _createServiceRoot: _ => serviceRoot = "createServiceRoot"
let createServiceRoot = () => _createServiceRoot(protoJs)
type rec protoStreamNext<'req> = ${bsProtobufPackage}.MethodWrapper.protoStreamNext<'req>
type rec protoStreamCallback<'res> = ${bsProtobufPackage}.MethodWrapper.protoStreamCallback<'res>
let methodWrapper = ${bsProtobufPackage}.MethodWrapper.methodWrapper
`);
}

const typeMap = {
  string: "string",
  int32: "int",
  uint32: "int",
  sint32: "int",
  fixed32: "int",
  sfixed32: "int",
  int64: "int64",
  uint64: "int64",
  sint64: "int64",
  fixed64: "int64",
  sfixed64: "int64",
  bytes: "Js_typed_array.Uint8Array.t",
  double: "float",
  float: "float",
  bool: "bool",
};
const mapClassMap = {
  string: "Belt.Map.String",
  int: "Belt.Map.Int",
  int64: "ReprotoBsProtobuf.MapInt64",
  bool: "ReprotoBsProtobuf.MapBool",
};
const mapEmptyMap = {
  string: ".empty",
  int: ".empty",
  int64: ".makeEmpty()",
  bool: ".makeEmpty()",
};

function mapFieldType(field, resolver) {
  const fieldType = field["type"];
  const fieldRule = field["rule"];
  const fieldKeyType = field["keyType"];
  let type;
  let name;
  let fieldAccessor;
  let keyType;
  let isRepeated;
  if (fieldKeyType) {
    // map
    keyType = typeMap[fieldKeyType];
    fieldAccessor = `MapField.${capitalize(keyType)}Key`;
    if (fieldRule) {
      throw new Error(`Field rule not supported with map type [${fieldRule}]`);
    }
  } else if (!fieldRule || fieldRule === "required") {
    // nothing to do, handle the same for now
    fieldAccessor = "Field";
  } else if (fieldRule === "repeated") {
    isRepeated = true;
    fieldAccessor = "MapField.Repeated";
  } else {
    throw new Error(`Field rule not supported [${fieldRule}]`);
  }
  const result = typeMap[fieldType];
  if (result !== undefined) {
    type = fieldType;
    name = result;
  } else {
    // enum or message type
    const data = resolver.lookup(fieldType).data;
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
    name = `Belt.Map.Int.t<${name}>`;
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
  if (fieldKeyType) {
    // map
    const mapClass = mapClassMap[keyType];
    if (!mapClass) {
      throw new Error(
        `Field keyType is not supported with map type [${fieldKeyType}]`
      );
    }
    name = `${mapClass}.t<${name}>`;
  }
  return { type, name, fieldAccessor };
}

function defaultFieldValue(field, resolver) {
  if (field["rule"] === "repeated") {
    // repeated field
    return "=Belt.Map.Int.empty";
  }
  if (isProto3Optional(field)) {
    // proto3: default for option
    return "=None";
  } else {
    const fieldType = field["type"];
    const fieldKeyType = field["keyType"];
    if (fieldKeyType) {
      // map: yield an empty map
      const mapType = typeMap[fieldKeyType];
      const mapClass = mapClassMap[mapType];
      const mapEmpty = mapEmptyMap[mapType];
      if (!mapClass) {
        throw new Error(
          `Field keyType is not supported with map type [${fieldKeyType}]`
        );
      }
      return `=${mapClass}${mapEmpty}`;
    } else {
      // All other types
      // proto2: optionals
      // proto2: required field, allow default in make.
      // proto3: non-optionals
      // XXX TBD handle proto2 defaults
      const result = {
        string: '""',
        int32: "0",
        uint32: "0",
        sint32: "0",
        fixed32: "0",
        sfixed32: "0",
        int64: 'Int64.of_string("0")',
        uint64: 'Int64.of_string("0")',
        sint64: 'Int64.of_string("0")',
        fixed64: 'Int64.of_string("0")',
        sfixed64: 'Int64.of_string("0")',
        bytes: "Js_typed_array.Uint8Array.make([])",
        double: "0.0",
        float: "0.0",
        bool: "false",
      }[fieldType];
      if (result !== undefined) {
        return `=${result}`;
      } else {
        // enum or message type
        const { data, relativePath } = resolver.lookup(fieldType);
        if (!data) {
          throw new Error(`Field type not found [${fieldType}]`);
        }
        if (data.values) {
          // enum
          return `=${relativePath}.${Object.keys(data.values)[0]}`;
        } else if (data.fields) {
          // message
          return `=${relativePath}.make()`;
        } else {
          throw new Error(`Unsupported field type [${fieldType}]`);
        }
      }
    }
  }
}

function* iterRealFieldNames(resolver) {
  const { data } = resolver;
  for (const fieldName in data.fields) {
    if (
      !data._oneofStructuralFieldNames ||
      !data._oneofStructuralFieldNames[fieldName]
    ) {
      yield fieldName;
    }
  }
}

function* iterOneofFieldNames(resolver) {
  const { data } = resolver;
  if (data.oneofs) {
    for (const fieldName in data.oneofs) {
      if (fieldName.charAt(0) !== "_") {
        yield fieldName;
      }
    }
  }
}

function emitFieldParameters(stream, resolver, indent) {
  for (const fieldName of iterRealFieldNames(resolver)) {
    const field = resolver.data.fields[fieldName];
    stream.write(
      `~${decapitalize(fieldName)}${defaultFieldValue(field, resolver)}, `
    );
  }
  for (const fieldName of iterOneofFieldNames(resolver)) {
    stream.write(
      `~${decapitalize(fieldName)}=Oneof.${capitalize(fieldName)}.None, `
    );
  }
  stream.write(`()`);
}

function emitFieldRecord(stream, resolver, indent) {
  stream.write(`{`);
  for (const fieldName of iterRealFieldNames(resolver)) {
    const decapitalizedFieldName = decapitalize(fieldName);
    stream.write(`${decapitalizedFieldName}: ${decapitalizedFieldName}, `);
  }
  for (const fieldName of iterOneofFieldNames(resolver)) {
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

function emitScopeDirective(stream, packageName) {
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

function emitEnum(stream, name, resolver, packageName, indent) {
  const { data } = resolver;
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

function emitOneofModule(stream, resolver, packageName, indent) {
  const { data } = resolver;
  stream.write(`\
${" ".repeat(indent)}module Oneof = {
`);
  for (const oneofFieldName of iterOneofFieldNames(resolver)) {
    stream.write(`\
${" ".repeat(indent)}  module ${capitalize(oneofFieldName)} = {
${" ".repeat(indent)}    type t =
`);
    const oneofFieldNames = data.oneofs[oneofFieldName].oneof;
    for (const fieldName of oneofFieldNames) {
      const field = data.fields[fieldName];
      stream.write(`\
${" ".repeat(indent)}      | ${capitalize(fieldName)}(${
        mapFieldType(field, resolver).name
      })
`);
      data._oneofStructuralFieldNames[fieldName] = true;
    }
    stream.write(`\
${" ".repeat(indent)}      | None
${" ".repeat(indent)}    let choices = (`);
    for (const fieldName of oneofFieldNames) {
      const field = data.fields[fieldName];
      stream.write(
        `("${mapFieldType(field, resolver).type}", "${fieldName}"), `
      );
    }
    if (oneofFieldNames.length === 1) {
      // there is no 1-tuples, workaround with terminator
      stream.write(`("", ""), `);
    }
    stream.write(`)
${" ".repeat(
  indent
)}    let convert = ${bsProtobufPackage}.ProtoTypeSupport.Convert.oneof(choices)
${" ".repeat(indent)}  }
`);
  }
  stream.write(`\
${" ".repeat(indent)}}
`);
}

function emitMessageClass(stream, name, resolver, packageName, indent) {
  const { data } = resolver;
  stream.write(`\
${" ".repeat(indent)}module ${capitalize(name)} = {
`);
  if (data.nested) {
    emitPackage(stream, resolver, packageName, indent + 2);
  }
  // annotation to cache the structural field names in this class
  data._oneofStructuralFieldNames = {};
  if (data.oneofs) {
    emitOneofModule(stream, resolver, packageName, indent + 2);
  }
  stream.write(`\
${" ".repeat(indent)}  type t = {
`);
  for (const fieldName of iterRealFieldNames(resolver)) {
    const field = data.fields[fieldName];
    stream.write(`\
${" ".repeat(indent)}    @as("${decapitalize(fieldName)}") ${fieldName}: ${
      mapFieldType(field, resolver).name
    },
`);
  }
  for (const fieldName of iterOneofFieldNames(resolver)) {
    stream.write(`\
${" ".repeat(indent)}    @as("${decapitalize(
      fieldName
    )}") ${fieldName}: Oneof.${capitalize(fieldName)}.t,
`);
  }
  stream.write(`\
${" ".repeat(indent)}  }
${" ".repeat(indent)}  let make = (`);
  emitFieldParameters(stream, resolver, indent);
  stream.write(`) => `);
  emitFieldRecord(stream, resolver, indent);
  stream.write(`
${" ".repeat(indent)}  `);
  emitProtoModuleDirective(stream, resolver);
  stream.write(`@val `);
  emitScopeDirective(stream, packageName);
  stream.write(`external messageClass: _ = "${name}"
${" ".repeat(indent)}  let encode = v => {
${" ".repeat(indent)}    Js.Obj.empty()
`);
  for (const fieldName of iterRealFieldNames(resolver)) {
    const field = data.fields[fieldName];
    const mapper = mapFieldType(field, resolver);
    stream.write(`\
${" ".repeat(indent)}    ->${bsProtobufPackage}.ProtoTypeSupport.${
      mapper.fieldAccessor
    }.fromR("${decapitalize(
      fieldName
    )}", ${bsProtobufPackage}.ProtoTypeSupport.Convert.${mapper.type}, v)
`);
  }
  for (const fieldName of iterOneofFieldNames(resolver)) {
    stream.write(`\
${" ".repeat(
  indent
)}    ->${bsProtobufPackage}.ProtoTypeSupport.Field.fromR("${decapitalize(
      fieldName
    )}", Oneof.${capitalize(fieldName)}.convert, v)
`);
  }
  // ${" ".repeat(
  //  indent
  // )}  let verify = (v: t) => ${bsProtobufPackage}.ProtoTypeSupport.verify(v, messageClass)
  stream.write(`\
${" ".repeat(
  indent
)}    ->${bsProtobufPackage}.ProtoTypeSupport.encode(messageClass)
${" ".repeat(indent)}  }
${" ".repeat(indent)}  let decode = (b): t => {
${" ".repeat(
  indent
)}    let m = ${bsProtobufPackage}.ProtoTypeSupport.decode(b, messageClass)
${" ".repeat(indent)}    make()
`);
  for (const fieldName of iterRealFieldNames(resolver)) {
    const field = data.fields[fieldName];
    const mapper = mapFieldType(field, resolver);
    stream.write(`\
${" ".repeat(indent)}    ->${bsProtobufPackage}.ProtoTypeSupport.${
      mapper.fieldAccessor
    }.toR("${decapitalize(
      fieldName
    )}", ${bsProtobufPackage}.ProtoTypeSupport.Convert.${mapper.type}, m)
`);
  }
  for (const fieldName of iterOneofFieldNames(resolver)) {
    stream.write(`\
${" ".repeat(
  indent
)}    ->${bsProtobufPackage}.ProtoTypeSupport.Field.toR("${decapitalize(
      fieldName
    )}", Oneof.${capitalize(fieldName)}.convert, m)
`);
  }
  stream.write(`\
${" ".repeat(indent)}  }
${" ".repeat(indent)}}
`);
}

function emitService(stream, name, resolver, packageName, indent) {
  const { data } = resolver;
  stream.write(`\
${" ".repeat(indent)}module ${capitalize(name)} = {
`);
  for (const methodName in data.methods) {
    const method = data.methods[methodName];
    // requestResolver looks up symbols from the Request type, which is different from
    // the resolver used for the service itself, and needed to generate the parameters
    // for the make call.
    const requestResolver = resolver.lookup(method.requestType);
    stream.write(`\
${" ".repeat(indent)}  module ${capitalize(methodName)} = {
${" ".repeat(indent)}    @send external wrapped: (serviceRoot, ${capitalize(
      method.requestType
    )}.t, protoStreamCallback<${capitalize(
      method.responseType
    )}.t>) => unit = "${packageName ? packageName + "/" : ""}${decapitalize(
      methodName
    )}"
${" ".repeat(indent)}    module Request = ${capitalize(method.requestType)}
${" ".repeat(indent)}    module Response = ${capitalize(method.responseType)}
${" ".repeat(
  indent
)}    let call = (serviceRoot, request) => methodWrapper(wrapped, serviceRoot, request)
${" ".repeat(indent)}    let make = (serviceRoot, `);
    emitFieldParameters(stream, requestResolver, indent);
    stream.write(`) => methodWrapper(wrapped, serviceRoot, `);
    emitFieldRecord(stream, requestResolver, indent);
    stream.write(`)
${" ".repeat(indent)}  }
`);
  }
  stream.write(`\
${" ".repeat(indent)}  `);
  emitProtoModuleDirective(stream, resolver);
  stream.write(`@val `);
  emitScopeDirective(stream, packageName);
  stream.write(`external serviceClass: _ = "${capitalize(name)}"
${" ".repeat(
  indent
)}  @module("@reproto/bs-protobuf") external _create: (serviceRoot, _, _, bool, bool) => serviceRoot = "createService"
${" ".repeat(
  indent
)}  let create = (serviceRoot, wrappedRpcImpl, requestDelimited, responseDelimited) =>
${" ".repeat(
  indent
)}    _create(serviceRoot, serviceClass, ${bsProtobufPackage}.RpcImpl.unwrap(wrappedRpcImpl), requestDelimited, responseDelimited)
${" ".repeat(indent)}}
`);
}

function emitProtoModuleDirective(stream, resolver) {
  stream.write(`@module("${resolver.protoJsPath}") `);
}

function emitEpilogue(stream, resolver) {}

function emitPackage(stream, resolver, prefix = "", indent = 0) {
  for (const name in resolver.data.nested) {
    const nextResolver = resolver.next(name);
    const nextData = nextResolver.data;
    const packageName = prefix !== "" ? `${prefix}.${name}` : name;
    if (nextData.values) {
      emitEnum(stream, name, nextResolver, packageName, indent);
    } else if (nextData.fields) {
      emitMessageClass(stream, name, nextResolver, packageName, indent);
    } else if (nextData.methods) {
      emitService(stream, name, nextResolver, packageName, indent);
    } else if (nextData.nested) {
      stream.write(`\
${" ".repeat(indent)}module ${capitalize(packageName)} = {
`);
      emitPackage(stream, nextResolver, packageName, indent + 2);
      stream.write(`${" ".repeat(indent)}}
`);
    }
  }
}
