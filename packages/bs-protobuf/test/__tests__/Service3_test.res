open Jest
open Expect
open MockJs
open Promise

exception TestError(string)

describe("proto services for version 3", () => {
  open Proto
  open ServiceTest3

  test("Request", () =>
    HelloService.World.Request.make === HelloWorldRequest.make |> expect |> toBe(true)
  )
  test("Response", () =>
    HelloService.World.Response.make === HelloWorldResponse.make |> expect |> toBe(true)
  )

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
      method.__servicePath__ |> expect |> toBe("serviceTest3.HelloService") |> done

    createServiceRoot()
    ->HelloService.create(rpcImpl, false, false)
    ->HelloService.World.make(~world="Hello World!", ())
    ->ignore
  })

  testAsync("request path", done => {
    open RpcImpl
    let rpcImpl = (path, _, _) => {
      path.__servicePath__|>expect|>toBe("serviceTest3.HelloService")|>done
    }
    createServiceRoot()->HelloService.create(rpcImpl, false, false)
    ->HelloService.World.make(~world="The answer", ())->ignore
  })

  let describeRequest = (doRequest: serviceRoot => protoStreamNext<HelloWorldResponse.t>, ()) => {

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

    testAsync("makes one call", done => {
      mockCallIt
      |> mockImplementation(_ => {
        Some(HelloWorldResponse.make(~world="The answer", ()))
      })
      |> ignore

      conn->doRequest->ignore
      mockCallIt |> calls |> Js.Array.length |> expect |> toBe(1)|>done
    })

    testAsync("sends request", done => {
      mockCallIt
      |> mockImplementationOnce((request: HelloWorldRequest.t) => {
        request.world |> expect |> toBe("Hello world!") |> done
        Some(HelloWorldResponse.make(~world="The answer", ()))
      })
      |> ignore

      conn->doRequest->ignore
    })

    testAsync("receives response", done => {
      mockCallIt
      |> mockImplementationOnce(_ => Some(
        HelloWorldResponse.make(~world="What is the question?", ()),
      ))
      |> ignore

      conn
      ->doRequest
      ->then(message => {
        switch message {
        | StreamMessage({world}, _) => world |> expect |> toBe("What is the question?") |> done
        | StreamTerminator => raise(TestError("Unexpected terminator"))
        }
        resolve()
      })
      ->ignore
    })

    testAsync("receives empty response", done => {
      mockCallIt |> mockImplementationOnce(_ => Some(HelloWorldResponse.make())) |> ignore

      conn
      ->doRequest
      ->then(message => {
        switch message {
        | StreamMessage({world}, _) => world |> expect |> toBe("") |> done
        | StreamTerminator => raise(TestError("Unexpected terminator"))
        }
        resolve()
      })
      ->ignore
    })

    testAsync("receives terminator", done => {
      mockCallIt |> mockImplementationOnce(_ => None) |> ignore

      conn
      ->doRequest
      ->then(message => {
        switch message {
        | StreamMessage(_, _) => raise(TestError("UnexpectedMessage"))
        | StreamTerminator => true |> expect |> toBe(true) |> done
        }
        resolve()
      })
      ->ignore
    })

    testAsync("returns error", done => {
      open RpcImpl

      let rpcImpl = (_, _, callback) => {
        let result = CallbackError(Js.Exn.raiseError("Test error"))
        Js.Global.setTimeout(() => callback(result), 10)->ignore
      }

      createServiceRoot()
      ->HelloService.create(rpcImpl, false, false)
      ->doRequest
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

  }

  describe(
    "send call",
    describeRequest(conn => HelloService.World.call(conn, {world: "Hello world!"})),
  )
  describe(
    "make call",
    describeRequest(conn => HelloService.World.make(conn, ~world="Hello world!", ())),
  )

})
