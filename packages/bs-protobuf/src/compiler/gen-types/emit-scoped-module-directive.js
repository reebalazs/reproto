function emitProtoModuleDirective(stream, resolver) {
  stream.write(`@module("${resolver.options.protoJsPath}") `);
}

function patchName(name) {
  if (name === "public") {
    // mangle "public" package id to work, this is stored as "public_"
    return "public_";
  } else {
    return name;
  }
}

function emitScopeDirective(stream, resolver) {
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

export function emitScopedModuleDirective(stream, resolver) {
  emitProtoModuleDirective(stream, resolver);
  stream.write(`@val `);
  emitScopeDirective(stream, resolver);
}
