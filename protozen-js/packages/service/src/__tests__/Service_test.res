open Jest
open Expect
open Promise

testAsync("new services", done => {
  open Proto

  let rpcImpl: RpcImpl.t = (_, requestData, callback) => {
    let requestWorld = requestData->Services.HelloWorldRequest.decode
    let world = `${requestWorld.world} - Responds!`
    let responseData =
      Services.HelloWorldResponse.make(~world, ())->Services.HelloWorldResponse.encode
    Js.Global.setTimeout(() => callback(None, Some(responseData)), 10)
    ->ignore
  }

  createServiceRoot()
  ->Services.HelloService.create(rpcImpl, false, false)
  ->Services.HelloService.World.make(~world="Hello World!", ())
  ->then(({v: {world}}) => {
    world |> expect |> toBe("Hello World! - Responds!") |> done
    resolve()
  })
  ->ignore
})

testAsync("method has __servicePath__ annotation", done => {
  open Proto

  let rpcImpl: RpcImpl.t = (method, _, _) =>
    method.__servicePath__ |> expect |> toBe("services.HelloService") |> done

  createServiceRoot()
  ->Services.HelloService.create(rpcImpl, false, false)
  ->Services.HelloService.World.make(~world="Hello World!", ())
  ->ignore
})
