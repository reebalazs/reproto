type method = {__servicePath__: string, name: string}
type requestData = Js_typed_array.ArrayBuffer.t
type responseData = Js_typed_array.ArrayBuffer.t
type callback = (option<exn>, option<responseData>) => unit
type t = (method, requestData, callback) => unit
