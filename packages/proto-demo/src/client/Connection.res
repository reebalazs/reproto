let create = (~url="https://example.com", ()) => {
  let rpc = ReprotoBsProtobuf.AxiosRpc.createRpc(~url, ())
  open ProtoDemo
  createServiceRoot()->Services.HelloService.create(rpc, false, false)
}
