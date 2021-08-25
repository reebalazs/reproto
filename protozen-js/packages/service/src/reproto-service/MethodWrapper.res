exception Fatal
exception UnsupportedServiceTerminator

%%raw(`
const _isExnTerminator = exn => exn ? exn.message === "PROTO_STREAM_TERMINATOR" : false;
`)
@val external isExnTerminator: exn => bool = "_isExnTerminator"

type rec protoStream<'req> =
  | StreamMessage('req, Promise.t<protoStream<'req>>)
  | StreamTerminator
type rec protoStreamNext<'req> = Promise.t<protoStream<'req>>
//type protoStreamCallback<'res> = (option<exn>, option<'res>) => unit
type protoStreamCallback<'res> = (Js.Nullable.t<exn>, Js.Nullable.t<'res>) => unit
type callbackQueue<'res> = array<protoStreamCallback<'res>>

let methodWrapper = (wrapped, serviceRoot, request) => {
  let callbackQueue = []
  let rec makePromise = () =>
    Promise.make((resolve, reject) =>
      callbackQueue
      ->Js.Array2.push((error, response) =>
        switch error->Js.Nullable.toOption {
        | Some(error) =>
          switch isExnTerminator(error) {
          | true => resolve(. StreamTerminator)
          | false => reject(. error)
          }
        | None =>
          switch response->Js.Nullable.toOption {
          | Some(response) => resolve(. StreamMessage(response, makePromise()))
          | None => raise(UnsupportedServiceTerminator)
          }
        }
      )
      ->ignore
    )
  let promise = makePromise()
  let protoStreamCallback =
    callbackQueue
    ->Js.Array2.pop
    ->(
      v => {
        switch v {
        | Some(protoStreamCallback) => protoStreamCallback
        | None => raise(Fatal)
        }
      }
    )
  wrapped(serviceRoot, request, protoStreamCallback)
  promise
}
