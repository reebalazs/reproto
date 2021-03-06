import { capitalize, decapitalize } from "./capitalize";
import { bsProtobufPackage } from "./emit-constants";
import { emitFieldParameters, emitFieldRecord } from "./emit-field";
import { emitScopedModuleDirective } from "./emit-scoped-module-directive";

function emitReference(stream, resolver, indent) {
  stream.write(`\
${" ".repeat(indent)}module ${resolver.name} = ${resolver.moduleName}
`);
}

function emitService(stream, resolver, indent) {
  const { data, packageName } = resolver;
  stream.write(`\
${" ".repeat(indent)}module ${capitalize(resolver.name)} = {
`);
  for (const methodName in data.methods) {
    const method = data.methods[methodName];
    // requestResolver looks up symbols from the Request type, which is different from
    // the resolver used for the service itself, and needed to generate the parameters
    // for the make call.
    const requestResolver = resolver.lookup(method.requestType);
    const responseResolver = resolver.lookup(method.responseType);

    stream.write(`\
${" ".repeat(indent)}  module ${capitalize(methodName)} = {
${" ".repeat(indent)}    @send external wrapped: (serviceRoot, ${capitalize(
      method.requestType
    )}.t, protoStreamCallback<${capitalize(
      method.responseType
    )}.t>) => unit = "${packageName ? packageName + "/" : ""}${decapitalize(
      methodName
    )}"
${" ".repeat(indent)}    module Request = ${requestResolver.moduleName}
${" ".repeat(indent)}    module Response = ${responseResolver.moduleName}
${" ".repeat(
  indent
)}    let call = (serviceRoot, request) => methodWrapper(wrapped, serviceRoot, request)
${" ".repeat(indent)}    let make = (serviceRoot, `);
    emitFieldParameters(stream, requestResolver, indent, true, false);
    stream.write(`) => methodWrapper(wrapped, serviceRoot, `);
    emitFieldRecord(stream, requestResolver, indent);
    stream.write(`)
`);
    if (requestResolver.options.withMake2) {
      stream.write(`\
${" ".repeat(indent)}    let make2 = (serviceRoot, `);
      emitFieldParameters(stream, requestResolver, indent, true, true);
      stream.write(`) => methodWrapper(wrapped, serviceRoot, `);
      emitFieldRecord(stream, requestResolver, indent);
      stream.write(`)
`);
    }
    stream.write(`\
${" ".repeat(indent)}  }
`);
  }
  stream.write(`\
${" ".repeat(indent)}  let packageName = "${packageName}"
${" ".repeat(indent)}  `);
  emitScopedModuleDirective(stream, resolver);
  stream.write(`external serviceClass: _ = "${capitalize(resolver.name)}"
${" ".repeat(
  indent
)}  @module("@reproto/bs-protobuf") external _create: (serviceRoot, string, _, _, bool, bool) => serviceRoot = "createService"
${" ".repeat(
  indent
)}  let create = (serviceRoot, wrappedRpcImpl, requestDelimited, responseDelimited) =>
${" ".repeat(
  indent
)}    _create(serviceRoot, packageName, serviceClass, ${bsProtobufPackage}.RpcImpl.unwrap(wrappedRpcImpl), requestDelimited, responseDelimited)
${" ".repeat(indent)}}
`);
}

export function emitPackagePass2(stream, parentResolver, indent = 0) {
  for (const name in parentResolver.data.nested) {
    const resolver = parentResolver.next(name);
    const { data } = resolver;
    if (data.values || data.fields) {
      // Reference to message or enum
      emitReference(stream, resolver, indent);
    } else if (data.methods) {
      emitService(stream, resolver, indent);
    } else if (data.nested) {
      stream.write(`\
${" ".repeat(indent)}module ${capitalize(name)} = {
`);
      emitPackagePass2(stream, resolver, indent + 2);
      stream.write(`${" ".repeat(indent)}}
`);
    }
  }
}
