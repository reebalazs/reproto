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

module MapFieldArray = {
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("mapFieldArray")
  external fromR: ('a, string, _, _) => 'a = "fromR"
  @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope("mapFieldArray")
  external toR: ('a, string, _, _) => 'a = "toR"
}

module MapFieldTupleArray = {
  module StringKey = {
    @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope(("mapFieldTupleArray", "stringKey"))
    external mFromA: (_, _) => _ = "mFromA"
    @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope(("mapFieldTupleArray", "stringKey"))
    external mToA: (_, _) => _ = "mToA"
  }

  module IntKey = {
    @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope(("mapFieldTupleArray", "intKey"))
    external mFromA: (_, _) => _ = "mFromA"
    @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope(("mapFieldTupleArray", "intKey"))
    external mToA: (_, _) => _ = "mToA"
  }

  module Int64Key = {
    @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope(("mapFieldTupleArray", "int64Key"))
    external mFromA: (_, _) => _ = "mFromA"
    @module("@reproto/bs-protobuf/src/api/proto-type-support") @scope(("mapFieldTupleArray", "int64Key"))
    external mToA: (_, _) => _ = "mToA"
  }
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

%%raw(`
const _getKey = (o, key) => o[key];
const _setKey = (o, key, value) => { o[key] = value; return o }
`)
@val external _getKey: (_, string) => _ = "_getKey"
@val external _setKey: ('a, string, _) => 'a = "_setKey"

module MapField = {
  module StringKey = {
    let fromR = (message, key, f, record) => {
      let v = _getKey(record, key)
      let array = Belt.Map.String.toArray(v)
      let m = MapFieldTupleArray.StringKey.mFromA(f, array)
      _setKey(message, key, m)
    }
    let toR = (record, key, f, message) => {
      let m = _getKey(message, key)
      let array = MapFieldTupleArray.StringKey.mToA(f, m)
      let v = Belt.Map.String.fromArray(array)
      _setKey(record, key, v)
    }
  }

  module IntKey = {
    let fromR = (message, key, f, record) => {
      let v = _getKey(record, key)
      let array = Belt.Map.Int.toArray(v)
      let m = MapFieldTupleArray.IntKey.mFromA(f, array)
      _setKey(message, key, m)
    }
    let toR = (record, key, f, message) => {
      let m = _getKey(message, key)
      let array = MapFieldTupleArray.IntKey.mToA(f, m)
      let v = Belt.Map.Int.fromArray(array)
      _setKey(record, key, v)
    }
  }

  module Int64Key = {
    let fromR = (message, key, f, record) => {
      let v = _getKey(record, key)
      let array = MapInt64.toArray(v)
      let m = MapFieldTupleArray.Int64Key.mFromA(f, array)
      _setKey(message, key, m)
    }
    let toR = (record, key, f, message) => {
      let m = _getKey(message, key)
      let array = MapFieldTupleArray.Int64Key.mToA(f, m)
      let v = MapInt64.fromArray(array)
      _setKey(record, key, v)
    }
  }
}
