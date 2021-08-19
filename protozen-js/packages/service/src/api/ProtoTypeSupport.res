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
  @module("@protozen/service/src/api/proto-type-support") @scope("fromRecord")
  external oneof: ('a, string, _, _) => 'a = "oneof"
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
  @module("@protozen/service/src/api/proto-type-support") @scope("toRecord")
  external oneof: ('a, string, _, _) => 'a = "oneof"
}

// New style conversion

module Field = {
  @module("@protozen/service/src/api/proto-type-support") @scope("field")
  external fromR: ('a, string, _, _) => 'a = "fromR"
  @module("@protozen/service/src/api/proto-type-support") @scope("field")
  external toR: ('a, string, _, _) => 'a = "toR"
}

module MapField = {
  @module("@protozen/service/src/api/proto-type-support") @scope("mapField")
  external fromR: ('a, string, _, _) => 'a = "fromR"
  @module("@protozen/service/src/api/proto-type-support") @scope("mapField")
  external toR: ('a, string, _, _) => 'a = "toR"
}

module Convert = {
  @module("@protozen/service/src/api/proto-type-support") @scope("Convert") @val
  external string: _ = "string"
  @module("@protozen/service/src/api/proto-type-support") @scope("Convert") @val
  external int32: _ = "int32"
  @module("@protozen/service/src/api/proto-type-support") @scope("Convert") @val
  external int64: _ = "int64"
  @module("@protozen/service/src/api/proto-type-support") @scope("Convert") @val
  external enum: _ = "enum"
  @module("@protozen/service/src/api/proto-type-support") @scope("Convert") @val
  external message: _ = "message"
  @module("@protozen/service/src/api/proto-type-support") @scope("Convert") @val
  external oneof: _ = "oneof"
}
