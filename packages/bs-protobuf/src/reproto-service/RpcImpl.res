type method = {__servicePath__: string, name: string}
type requestData = Js_typed_array.ArrayBuffer.t
type responseData = Js_typed_array.ArrayBuffer.t
type unwrappedResponseData = Js_typed_array.ArrayBuffer.t
type callback = (Js.nullable<exn>, Js.nullable<unwrappedResponseData>) => unit
type unwrappedT = (method, requestData, callback) => unit

type callbackResult =
  | CallbackResponse(responseData)
  | CallbackError(exn)
  | CallbackTerminator

type wrappedCallback = callbackResult => unit
type t = (method, requestData, wrappedCallback) => unit

%%raw(`
const _exnTerminator = new Error("PROTO_STREAM_TERMINATOR");
`)
@val external exnTerminator: exn = "_exnTerminator"

let unwrap = (rpcImpl, method, requestData, callback) => {
  let wrappedCallback = callbackResult =>
    switch callbackResult {
    | CallbackResponse(responseData) =>
      callback(
        Js.Nullable.null,
        Js.Nullable.return(responseData->Js_typed_array.Uint8Array.fromBuffer),
      )
    | CallbackError(exn) => callback(Js.Nullable.return(exn), Js.Nullable.null)
    | CallbackTerminator => callback(Js.Nullable.return(exnTerminator), Js.Nullable.null)
    // Not supported
    // | CallbackServiceTerminator => callback(Js.Nullable.null, Js.Nullable.null)
    }
  rpcImpl(method, requestData, wrappedCallback)
}
