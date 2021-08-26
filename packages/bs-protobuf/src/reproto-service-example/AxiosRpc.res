open Axios
open Belt

@send
external putBinary: (
  Instance.t,
  string,
  Js_typed_array.Uint8Array.t,
) => Promise.t<Axios_types.response<'a, 'b>> = "put"

let createRpc = (~url="https://example.com", ()) => {
  let inst = Instance.create(
    makeConfig(
      ~baseURL=url,
      ~headers=Axios.Headers.fromObj({
        "Content-Type": "application/x-protobuf",
      }),
      ~responseType="arraybuffer",
      (),
    ),
  )

  let rpc: RpcImpl.t = (method, requestData, callback) => {
    open Promise
    let path = `/api/1.0/${method.__servicePath__}/${method.name}`
    inst
    ->putBinary(path, Js_typed_array.Uint8Array.fromBuffer(requestData))
    ->then(resp => {
      switch resp["status"] {
      | 200 => callback(CallbackResponse(resp["data"]))
      | status => Js.Exn.raiseError(`Error ${status->Int.toString}: ${resp["statusText"]}`)
      }
      resolve()
    })
    ->catch(error => {
      callback(CallbackError(error))
      resolve()
    })
    ->ignore
  }

  rpc
}
