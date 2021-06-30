import { Connection, annotateProto } from "@protozen/service";

export function createConnection(url, apikey, apitoken, timeout, proto) {
  annotateProto(proto);
  const options = { url, apikey, apitoken, timeout };
  const connection = new Connection(options);
  const add = (serviceName, serviceDesc) => {
    const service = connection.createService(serviceDesc);
    for (const methodName of Object.keys(serviceDesc.prototype)) {
      if (methodName === "constructor") {
        continue;
      }
      connection[serviceDesc.__servicePath__ + "/" + methodName] = (rq, cb) =>
        service[methodName].call(service, rq, cb);
    }
  };
  add("hello", proto.services.HelloService);
  return connection;
}
