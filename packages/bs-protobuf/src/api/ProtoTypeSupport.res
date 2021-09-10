@module("@reproto/bs-protobuf/src/api/proto-type-support")
external decode: (Js_typed_array.ArrayBuffer.t, _) => 'a = "d"
@module("@reproto/bs-protobuf/src/api/proto-type-support")
external encode: (_, _) => Js_typed_array.array_buffer = "e"
@module("@reproto/bs-protobuf/src/api/proto-type-support")
external verify: ('a, _) => option<string> = "v"
module FromRecord = {
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("fromRecord")
  external string: ('a, string, _) => 'a = "string"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("fromRecord")
  external int32: ('a, string, _) => 'a = "int32"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("fromRecord")
  external int64: ('a, string, _) => 'a = "int64"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("fromRecord")
  external bytes: ('a, string, _) => 'a = "bytes"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("fromRecord")
  external enum: ('a, string, _) => 'a = "enum"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("fromRecord")
  external message: ('a, string, _) => 'a = "message"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("fromRecord")
  external oneof: ('a, string, _, _) => 'a = "oneof"
}
module ToRecord = {
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("toRecord")
  external string: ('a, string, _) => 'a = "string"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("toRecord")
  external int32: ('a, string, _) => 'a = "int32"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("toRecord")
  external int64: ('a, string, _) => 'a = "int64"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("toRecord")
  external bytes: ('a, string, _) => 'a = "bytes"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("toRecord")
  external enum: ('a, string, _) => 'a = "enum"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("toRecord")
  external message: ('a, string, _) => 'a = "message"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("toRecord")
  external oneof: ('a, string, _, _) => 'a = "oneof"
}

// New style conversion

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
  external int64: _ = "int64"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external bytes: _ = "bytes"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external enum: _ = "enum"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external message: _ = "message"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("Convert") @val
  external oneof: _ = "oneof"
}
