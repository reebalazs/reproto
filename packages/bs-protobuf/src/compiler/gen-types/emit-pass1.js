import { capitalize, decapitalize } from "./capitalize";
import { bsProtobufPackage } from "./emit-constants";
import {
  emitScopeDirective,
  emitFieldParameters,
  emitFieldRecord,
  typeMap,
  mapClassMap,
  isProto3Optional,
} from "./emit-field";

function mapFieldType(field, parentResolver) {
  const fieldType = field["type"];
  const fieldRule = field["rule"];
  const fieldKeyType = field["keyType"];
  let type;
  let name;
  let fieldAccessor;
  let keyType;
  let isRepeated;
  let resolver;
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
    resolver = parentResolver.lookup(fieldType);
    const { data, flattenedName } = resolver;
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
    name = `${flattenedName}.t`;
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
  return { type, name, fieldAccessor, resolver };
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

function emitEnumPass1(stream, resolver, indent) {
  const { data } = resolver;
  // Break up recursion
  if (data.__processed === 2) {
    // already processed
    return;
  }
  stream.write(`\
${" ".repeat(indent)}module ${resolver.flattenedName} = {
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
  // Mark "processed" state
  data.__processed = 2;
}

export function emitNestedReferences(stream, parentResolver, indent) {
  for (const name in parentResolver.data.nested) {
    const resolver = parentResolver.next(name);
    const { data } = resolver;
    if (data.values || data.fields) {
      // Enum or message references
      stream.write(`\
${" ".repeat(indent)}  module ${resolver.name} = ${resolver.flattenedName}
`);
    } else if (data.nested) {
      emitNestedReferences(stream, resolver, indent + 2);
    }
  }
}

function emitOneofModule(stream, resolver, indent) {
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

function emitMessageClassPass1(stream, resolver, indent) {
  const { data } = resolver;
  // Break up recursion
  if (data.__processed === 2) {
    // already processed
    return;
  } else if (data.__processed === 1) {
    // in progress.
    throw new Error(`Circular reference in "${resolver.packageName}"`);
  }
  // Mark "in progress" state
  data.__processed = 1;
  // Sanity check - this should not be an enum
  if (data.values) {
    throw new Error(
      `Fatal error: Enums should all be processed at this point. [${resolver.packageName}]`
    );
  }
  if (data.nested) {
    // Nested type generation
    emitPackagePass1(stream, resolver, indent);
  }
  for (const fieldName of iterRealFieldNames(resolver)) {
    // Recursive dependent type generation
    const field = data.fields[fieldName];
    const { resolver: fieldResolver } = mapFieldType(field, resolver);
    if (fieldResolver) {
      // This can be a message class or an enum.
      emitEntityPass1(stream, fieldResolver, indent);
    }
  }
  stream.write(`\
${" ".repeat(indent)}module ${resolver.flattenedName} = {
`);
  if (data.nested) {
    // Nested reference generation
    emitNestedReferences(stream, resolver, indent);
  }
  // annotation to cache the structural field names in this class
  data._oneofStructuralFieldNames = {};
  if (data.oneofs) {
    emitOneofModule(stream, resolver, indent + 2);
  }
  const isEmpty = Object.keys(resolver.data.fields).length === 0;
  if (isEmpty) {
    // Empty type special case, as an empty record is
    // not typeable in rescript
    stream.write(`\
${" ".repeat(indent)}  type t = unit
${" ".repeat(indent)}  let make = (()) => ()`);
  } else {
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
    emitFieldParameters(stream, resolver, indent, false);
    stream.write(`) => `);
    emitFieldRecord(stream, resolver, indent);
  }
  stream.write(`
${" ".repeat(indent)}  `);
  emitProtoModuleDirective(stream, resolver);
  stream.write(`@val `);
  emitScopeDirective(stream, resolver);
  stream.write(`external messageClass: _ = "${resolver.name}"
`);
  if (isEmpty) {
    // Empty type special case
    stream.write(`\
${" ".repeat(indent)}  let encode = _ => {
${" ".repeat(indent)}    Js.Obj.empty()
${" ".repeat(
  indent
)}    ->ReprotoBsProtobuf.ProtoTypeSupport.encode(messageClass)
${" ".repeat(indent)}  }
${" ".repeat(indent)}  let decode = (_): t => {
${" ".repeat(indent)}    make()
`);
  } else {
    stream.write(`\
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
  }
  stream.write(`\
${" ".repeat(indent)}  }
${" ".repeat(indent)}}
`);
  // Mark "processed" state
  data.__processed = 2;
}

function emitProtoModuleDirective(stream, resolver) {
  stream.write(`@module("${resolver.protoJsPath}") `);
}

function emitEntityPass1(stream, resolver, indent) {
  // Emit the message class, enum, or package, of the current resolver
  const { data } = resolver;
  if (data.values) {
    emitEnumPass1(stream, resolver, indent);
  } else if (data.fields) {
    emitMessageClassPass1(stream, resolver, indent);
  } else if (data.nested) {
    emitPackagePass1(stream, resolver, indent);
  }
}

export function emitPackagePass1(stream, parentResolver, indent = 2) {
  for (const name in parentResolver.data.nested) {
    const resolver = parentResolver.next(name);
    emitEntityPass1(stream, resolver, indent);
  }
}
