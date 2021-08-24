open Jest
open Expect
open MockJs
open Promise

exception TestError(string)

describe("proto services", () => {
  testAsync("create", done => {
    open Proto
    open RpcImpl

    let rpcImpl = (_, requestData, callback) => {
      let requestWorld = requestData->Services.HelloWorldRequest.decode
      let world = `${requestWorld.world} - Responds!`
      let responseData =
        Services.HelloWorldResponse.make(~world, ())->Services.HelloWorldResponse.encode
      Js.Global.setTimeout(() => callback(CallbackResponse(responseData)), 10)->ignore
    }

    createServiceRoot()
    ->Services.HelloService.create(rpcImpl, false, false)
    ->Services.HelloService.World.make(~world="Hello World!", ())
    ->then(message => {
      switch message {
      | StreamMessage({world}, _) => world |> expect |> toBe("Hello World! - Responds!") |> done
      | StreamTerminator => raise(TestError("Unexpected terminator"))
      }
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

  describe("calling", () => {
    open Proto
    open RpcImpl
    let mockCallIt = JestJs.fn(_ => None)
    let callIt = mockCallIt |> fn
    let rpcImpl = (_, requestData, callback) => {
      let response = requestData->Services.HelloWorldRequest.decode->callIt
      let result = switch response {
      | Some(response) => Services.HelloWorldResponse.encode(response)->CallbackResponse
      | None => CallbackTerminator
      }
      Js.Global.setTimeout(() => callback(result), 10)->ignore
    }
    let conn = createServiceRoot()->Services.HelloService.create(rpcImpl, false, false)

    beforeEach(JestJs.clearAllMocks)

    testAsync("call sends request", done => {
      mockCallIt
      |> mockImplementationOnce((request: Services.HelloWorldRequest.t) => {
        request.world |> expect |> toBe("The answer") |> done
        Some(Services.HelloWorldResponse.make(~world="XXX", ()))
      })
      |> ignore

      conn->Services.HelloService.World.make(~world="The answer", ())->ignore
    })

    testAsync("call receives response", done => {
      mockCallIt
      |> mockImplementationOnce(_ => Some(
        Services.HelloWorldResponse.make(~world="What is the question?", ()),
      ))
      |> ignore

      conn
      ->Services.HelloService.World.make(~world="The answer", ())
      ->then(message => {
        switch message {
        | StreamMessage({world}, _) => world |> expect |> toBe("What is the question?") |> done
        | StreamTerminator => raise(TestError("Unexpected terminator"))
        }
        resolve()
      })
      ->ignore
    })

    testAsync("call receives empty response", done => {
      mockCallIt |> mockImplementationOnce(_ => Some(Services.HelloWorldResponse.make())) |> ignore

      conn
      ->Services.HelloService.World.make(~world="The answer", ())
      ->then(message => {
        switch message {
        | StreamMessage({world}, _) => world |> expect |> toBe("") |> done
        | StreamTerminator => raise(TestError("Unexpected terminator"))
        }
        resolve()
      })
      ->ignore
    })

    testAsync("call receives terminator", done => {
      mockCallIt |> mockImplementationOnce(_ => None) |> ignore

      conn
      ->Services.HelloService.World.make(~world="The answer", ())
      ->then(message => {
        switch message {
        | StreamMessage(_, _) => raise(TestError("UnexpectedMessage"))
        | StreamTerminator => true |> expect |> toBe(true) |> done
        }
        resolve()
      })
      ->ignore
    })
  })

  testAsync("returns error", done => {
    open Proto
    open RpcImpl

    JestJs.clearAllMocks()

    let rpcImpl: RpcImpl.t = (method, _, _) =>
      method.__servicePath__ |> expect |> toBe("services.HelloService") |> done

    let mockCallIt = JestJs.fn(_ => None)
    let callIt = mockCallIt |> fn
    let rpcImpl = (_, requestData, callback) => {
      let result = CallbackError(Js.Exn.raiseError("Test error"))
      Js.Global.setTimeout(() => callback(result), 10)->ignore
    }
    let conn = createServiceRoot()->Services.HelloService.create(rpcImpl, false, false)

    createServiceRoot()
    ->Services.HelloService.create(rpcImpl, false, false)
    ->Services.HelloService.World.make(~world="Hello World!", ())
    ->catch(error => {
      switch error {
      | JsError(obj) =>
        switch obj->Js.Exn.message {
        | Some(message) => message |> expect |> toBe("Test error") |> done
        | _ => raise(TestError("Expected an error"))
        }
      | _ => raise(TestError("Unknown rescript error"))
      }
      resolve(MethodWrapper.StreamTerminator)
    })
    ->ignore
  })
})
