export function createServiceRoot(proto) {
  return {};
}

export function createService(
  serviceRoot,
  packageName,
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
    service[methodName].__servicePath__ = packageName;
    serviceRoot[packageName + "/" + methodName] = (rq, cb) =>
      service[methodName].call(service, rq, cb);
  }
  return serviceRoot;
}
