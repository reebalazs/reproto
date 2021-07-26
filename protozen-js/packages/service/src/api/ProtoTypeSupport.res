@module("@protozen/service/src/api/proto-type-support")
external decode: (Js_typed_array.ArrayBuffer.t, _) => 'a = "d"
@module("@protozen/service/src/api/proto-type-support")
external encode: (_, _) => Js_typed_array.array_buffer = "e"
@module("@protozen/service/src/api/proto-type-support")
external verify: ('a, _) => option<string> = "v"
module FromRecord = {
  @module("@protozen/service/src/api/proto-type-support") @scope("fromRecord")
  external string: ('a, string, _) => 'a = "string"
  @module("@protozen/service/src/api/proto-type-support") @scope("fromRecord")
  external int32: ('a, string, _) => 'a = "int32"
  @module("@protozen/service/src/api/proto-type-support") @scope("fromRecord")
  external int64: ('a, string, _) => 'a = "int64"
  @module("@protozen/service/src/api/proto-type-support") @scope("fromRecord")
  external enum: ('a, string, _) => 'a = "enum"
  @module("@protozen/service/src/api/proto-type-support") @scope("fromRecord")
  external message: ('a, string, _) => 'a = "message"
}
module ToRecord = {
  @module("@protozen/service/src/api/proto-type-support") @scope("toRecord")
  external string: ('a, string, _) => 'a = "string"
  @module("@protozen/service/src/api/proto-type-support") @scope("toRecord")
  external int32: ('a, string, _) => 'a = "int32"
  @module("@protozen/service/src/api/proto-type-support") @scope("toRecord")
  external int64: ('a, string, _) => 'a = "int64"
  @module("@protozen/service/src/api/proto-type-support") @scope("toRecord")
  external enum: ('a, string, _) => 'a = "enum"
  @module("@protozen/service/src/api/proto-type-support") @scope("toRecord")
  external message: ('a, string, _) => 'a = "message"
}
