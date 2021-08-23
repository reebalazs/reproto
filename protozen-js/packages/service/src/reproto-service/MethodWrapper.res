open Promise

type rec protoStream<'a> = {v: 'a, next: t<option<protoStream<'a>>>}
type oProtoStream<'a> = option<protoStream<'a>>
// for no-streams, 1 response required
type protoResponse<'a> = t<protoStream<'a>>
// for streams, zero response allowed
type oProtoResponse<'a> = t<oProtoStream<'a>>

// No stream wrapper, returns protoResponse
let methodWrapper = response => make((resolve, _reject) =>
  response->then(v => {
    resolve(. {v, next: Promise.resolve(None)})
    Promise.resolve()
    })->ignore
  )
