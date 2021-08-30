let create = (~url="https://example.com", ()) => {
  let rpc = ReprotoBsRpcAxios.RpcAxios.createRpc(~url, ())
  open ProtoDemo
  createServiceRoot()->Services.HelloService.create(rpc, false, false)
}
