open Belt
open Jest
open Expect
open MockJs

exception UnexpectedTerminator

type response = {
  data: Js_typed_array.ArrayBuffer.t,
  status: int,
  text: string,
}

@module("axios") external put: _ = "put"

let getArrayIndex = (i, a) =>
  switch a[i] {
  | Some(v) => v
  | None => raise(Not_found)
  }

module Connection = {
  let create = (~url="https://example.com", ()) => {
    let rpc = AxiosRpc.createRpc(~url, ())
    open Proto
    createServiceRoot()->ServiceTest.HelloService.create(rpc, false, false)
  }
}

describe("Protobuf services functionality with AxiosConnection", () => {
  open Promise
  open Proto
  open ServiceTest

  describe("HelloService", () => {

    let conn = Connection.create(~url="http://127.0.0.1:8030", ())

    let describeRequest = (doRequest: serviceRoot => protoStreamNext<HelloWorldResponse.t>, ()) => {
      let testSendAsync = (expectIt, done) => {
        JestJs.clearAllMocks()
        put
        |> mockImplementationOnce(_ =>
          resolve({
            data: HelloWorldResponse.make(
              ~world="What is the question?",
              (),
            )->HelloWorldResponse.encode,
            status: 200,
            text: "OK",
          })
        )
        |> ignore

        conn
        ->doRequest
        ->then(message => {
          switch message {
          | StreamMessage({world}, _) => expectIt(put, world) |> done
          | StreamTerminator => raise(UnexpectedTerminator)
          }
          resolve()
        })
        ->ignore
      }

      testAsync(
        "request nr",
        testSendAsync((put, _) => put |> calls |> Js.Array.length |> expect |> toBe(1)),
      )
      testAsync(
        "request path",
        testSendAsync((put, _) =>
          put
          |> calls
          |> getArrayIndex(0)
          |> getArrayIndex(0)
          |> expect
          |> toEqual("/api/1.0/serviceTest.HelloService/World")
        ),
      )
      testAsync(
        "request payload",
        testSendAsync((put, _) =>
          put
          |> calls
          |> getArrayIndex(0)
          |> getArrayIndex(1)
          |> HelloWorldRequest.decode
          |> (v => v.world)
          |> expect
          |> toEqual("The answer")
        ),
      )
      testAsync(
        "response payload",
        testSendAsync((_, world) => world |> expect |> toBe("What is the question?")),
      )
    }

    describe(
      "send call",
      describeRequest(conn => HelloService.World.call(conn, {world: "The answer"})),
    )
    describe(
      "make call",
      describeRequest(conn => HelloService.World.make(conn, ~world="The answer", ())),
    )
    test("Request", () =>
      HelloService.World.Request.make === HelloWorldRequest.make |> expect |> toBe(true)
    )
    test("Response", () =>
      HelloService.World.Response.make === HelloWorldResponse.make |> expect |> toBe(true)
    )
  })
})
