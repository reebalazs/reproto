import { annotateProto } from "@reproto/bs-protobuf";

export function createServiceRoot(proto) {
  annotateProto(proto);
  const serviceRoot = {};
  return serviceRoot;
}

export function createService(
  serviceRoot,
  serviceClass,
  rpcImpl,
  requestDelimited,
  responseDelimited
) {
  const service = serviceClass.create(
    rpcImpl,
    requestDelimited,
    responseDelimited
  );
  for (const methodName of Object.keys(serviceClass.prototype)) {
    if (methodName === "constructor") {
      continue;
    }
    service[methodName].__servicePath__ = serviceClass.__servicePath__;
    serviceRoot[serviceClass.__servicePath__ + "/" + methodName] = (rq, cb) =>
      service[methodName].call(service, rq, cb);
  }
  return serviceRoot;
}
