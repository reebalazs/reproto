// @flow

export function annotateProto(proto: Object) {
  if (!proto["__annotated__"]) {
    proto["public"] = proto.public_;
    annotatePackage(proto);
    proto["__annotated__"] = true;
  }
}

function annotatePackage(packageRoot: Object, prefix: string = "") {
  for (const path in packageRoot) {
    const member = packageRoot[path];
    const packageName = prefix !== "" ? `${prefix}.${path}` : path;
    if (typeof member === "function" && typeof member.create === "function") {
      member.__servicePath__ = packageName;
    } else if (typeof member === "object") {
      annotatePackage(member, packageName);
    }
  }
}
