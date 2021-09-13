@module("@reproto/bs-protobuf/src/api/proto-type-support")
external decode: (Js_typed_array.ArrayBuffer.t, _) => 'a = "d"
@module("@reproto/bs-protobuf/src/api/proto-type-support")
external encode: (_, _) => Js_typed_array.array_buffer = "e"
@module("@reproto/bs-protobuf/src/api/proto-type-support")
external verify: ('a, _) => option<string> = "v"

module Field = {
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("field")
  external fromR: ('a, string, _, _) => 'a = "fromR"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("field")
  external toR: ('a, string, _, _) => 'a = "toR"
}

module MapField = {
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("mapField")
  external fromR: ('a, string, _, _) => 'a = "fromR"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("mapField")
  external toR: ('a, string, _, _) => 'a = "toR"
}

module Convert = {
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external string: _ = "string"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external int32: _ = "int32"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external uint32: _ = "uint32"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external sint32: _ = "sint32"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external fixed32: _ = "fixed32"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external sfixed32: _ = "sfixed32"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external int64: _ = "int64"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external uint64: _ = "uint64"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external sint64: _ = "sint64"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external fixed64: _ = "fixed64"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external sfixed64: _ = "sfixed64"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external float: _ = "float"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external double: _ = "double"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external bytes: _ = "bytes"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external enum: _ = "enum"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external message: _ = "message"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external oneof: _ = "oneof"
}
