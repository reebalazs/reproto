import { capitalize, decapitalize } from "./capitalize";
import { bsProtobufPackage } from "./emit-constants";

// export function isProto2Required(field: Object): boolean {
//   return field.rule && field.rule === "required";
// }

export function isProto3Optional(field) {
  return field.options && field.options["proto3_optional"] === true;
}

export const typeMap = {
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
export const mapClassMap = {
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

function defaultFieldValue(field, resolver, pass2) {
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
        const fieldResolver = resolver.lookup(fieldType);
        const { data } = fieldResolver;
        const name = pass2
          ? fieldResolver.moduleName
          : fieldResolver.flattenedName;
        if (!data) {
          throw new Error(`Field type not found [${fieldType}]`);
        }
        if (data.values) {
          // enum
          return `=${name}.${Object.keys(data.values)[0]}`;
        } else if (data.fields) {
          // message
          return `=${name}.make()`;
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

export function emitFieldParameters(stream, resolver, indent, pass2) {
  for (const fieldName of iterRealFieldNames(resolver)) {
    const field = resolver.data.fields[fieldName];
    stream.write(
      `~${decapitalize(fieldName)}${defaultFieldValue(
        field,
        resolver,
        pass2
      )}, `
    );
  }
  for (const fieldName of iterOneofFieldNames(resolver)) {
    stream.write(
      `~${decapitalize(fieldName)}=Oneof.${capitalize(fieldName)}.None, `
    );
  }
  stream.write(`()`);
}

export function emitFieldRecord(stream, resolver, indent) {
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

export function emitScopeDirective(stream, resolver) {
  // take off the name from the end
  const prefix = resolver.prefix.slice(0, -1);
  if (prefix.length > 0) {
    stream.write(`@scope(`);
    if (prefix.length > 1) {
      stream.write(`(`);
      for (const segment of prefix) {
        stream.write(`"${patchName(segment)}", `);
      }
      stream.write(`)`);
    } else {
      stream.write(`"${patchName(prefix[0])}"`);
    }
    stream.write(`) `);
  }
}
