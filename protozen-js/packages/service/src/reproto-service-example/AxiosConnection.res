open Axios
open Belt

@send
external putBinary: (
  Instance.t,
  string,
  Js_typed_array.Uint8Array.t,
) => Promise.t<Axios_types.response<'a, 'b>> = "put"

let createConnection = (~url="https://example.com", ()) => {
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

  open RpcImpl
  let rpcImpl = (method, requestData, callback) => {
    open Promise
    let path = `/api/1.0/${method.__servicePath__}/${method.name}`
    inst
    ->putBinary(path, Js_typed_array.Uint8Array.fromBuffer(requestData))
    ->then(resp => {
      switch resp["status"] {
      | 200 => callback(None, Some(Js_typed_array.Uint8Array.fromBuffer(resp["data"])))
      | status => Js.Exn.raiseError(`Error ${status->Int.toString}: ${resp["statusText"]}`)
      }
      resolve()
    })
    ->catch(error => {
      callback(Some(error), None)
      resolve()
    })
    ->ignore
  }

  open Proto
  createServiceRoot()->Services.HelloService.create(rpcImpl, false, false)
}
