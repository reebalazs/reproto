open Jest
open Expect
open MockJs
open Promise

exception TestError(string)

describe("proto services", () => {
  open Proto
  open ServiceTest

  testAsync("create", done => {
    open RpcImpl

    let rpcImpl = (_, requestData, callback) => {
      let requestWorld = requestData->HelloWorldRequest.decode
      let world = `${requestWorld.world} - Responds!`
      let responseData =
        HelloWorldResponse.make(~world, ())->HelloWorldResponse.encode
      Js.Global.setTimeout(() => callback(CallbackResponse(responseData)), 10)->ignore
    }

    createServiceRoot()
    ->HelloService.create(rpcImpl, false, false)
    ->HelloService.World.make(~world="Hello World!", ())
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

    let rpcImpl: RpcImpl.t = (method, _, _) =>
      method.__servicePath__ |> expect |> toBe("serviceTest.HelloService") |> done

    createServiceRoot()
    ->HelloService.create(rpcImpl, false, false)
    ->HelloService.World.make(~world="Hello World!", ())
    ->ignore
  })

  describe("calling", () => {
    open RpcImpl
    let mockCallIt = JestJs.fn(_ => None)
    let callIt = mockCallIt |> fn
    let rpcImpl = (_, requestData, callback) => {
      let response = requestData->HelloWorldRequest.decode->callIt
      let result = switch response {
      | Some(response) => HelloWorldResponse.encode(response)->CallbackResponse
      | None => CallbackTerminator
      }
      Js.Global.setTimeout(() => callback(result), 10)->ignore
    }
    let conn = createServiceRoot()->HelloService.create(rpcImpl, false, false)

    beforeEach(JestJs.clearAllMocks)

    testAsync("call sends request", done => {
      mockCallIt
      |> mockImplementationOnce((request: HelloWorldRequest.t) => {
        request.world |> expect |> toBe("The answer") |> done
        Some(HelloWorldResponse.make(~world="XXX", ()))
      })
      |> ignore

      conn->HelloService.World.make(~world="The answer", ())->ignore
    })

    testAsync("call receives response", done => {
      mockCallIt
      |> mockImplementationOnce(_ => Some(
        HelloWorldResponse.make(~world="What is the question?", ()),
      ))
      |> ignore

      conn
      ->HelloService.World.make(~world="The answer", ())
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
      mockCallIt |> mockImplementationOnce(_ => Some(HelloWorldResponse.make())) |> ignore

      conn
      ->HelloService.World.make(~world="The answer", ())
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
      ->HelloService.World.make(~world="The answer", ())
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
    open RpcImpl

    JestJs.clearAllMocks()

    let rpcImpl = (_, _, callback) => {
      let result = CallbackError(Js.Exn.raiseError("Test error"))
      Js.Global.setTimeout(() => callback(result), 10)->ignore
    }

    createServiceRoot()
    ->HelloService.create(rpcImpl, false, false)
    ->HelloService.World.make(~world="Hello World!", ())
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
