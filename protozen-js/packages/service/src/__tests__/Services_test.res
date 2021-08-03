open Belt
open Jest
open Expect
open MockJs

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

describe("Protobuf services support", () => {
  open Promise
  // open ProtozenService.Connection
  // open ProtozenService.Proto
  open Connection
  open Proto
  open Services

  describe("HelloService", () => {
    let conn = createConnection(~url="http://127.0.0.1:8030", ~protoJs, ())

    let describeRequest = (doRequest: connection => protoResponse<HelloWorldResponse.t>, ()) => {
      let testSendAsync = (expectIt, done) => {
        JestJs.clearAllMocks()
        put
        |> mockImplementationOnce(r =>
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
        ->then(({v: {world}}) => {
          expectIt(put, world) |> done
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
          |> toEqual("/api/1.0/services/hello_service/world")
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
    test(
      "Request",
      () => (HelloService.World.Request.make === HelloWorldRequest.make) |> expect |> toBe(true)
    )
    test(
      "Response",
      () => (HelloService.World.Response.make === HelloWorldResponse.make) |> expect |> toBe(true)
    )
  })
})
