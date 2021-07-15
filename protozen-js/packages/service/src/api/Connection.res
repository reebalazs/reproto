open Belt
open Promise

type connection = unit

@module("./create-connection")
external createConnection: (
  ~url: string,
  ~apikey: string=?,
  ~apitoken: string=?,
  ~timeout: int=?,
  ~protoJs: unit,
  unit,
) => connection = "createConnection"

type rec protoStream<'a> = {v: 'a, next: Promise.t<option<protoStream<'a>>>}
type oProtoStream<'a> = option<protoStream<'a>>
// for no-streams, 1 response required
type protoResponse<'a> = Promise.t<protoStream<'a>>
// for streams, zero response allowed
type oProtoResponse<'a> = Promise.t<oProtoStream<'a>>

// No stream wrapper, returns protoResponse
let wrapMethod = response => make((resolve, _reject) =>
  response->then(v => {
    resolve(. {v, next: Promise.resolve(None)})
    Promise.resolve() // Why?
    })->ignore
  )
