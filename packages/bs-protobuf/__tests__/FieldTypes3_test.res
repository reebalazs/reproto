open Jest
open Expect

describe("Protobuf field types support", () => {
  open Proto.TypeTest3

  describe("basic", () => {
    let testTypeSupport = (v: Basic.t) => {
      test("string", () => v.stringField |> expect |> toBe(Some("The answer")))
      test("int32", () => v.int32Field |> expect |> toBe(Some(42)))
      // test("verify", () => v |> Basic.verify |> expect |> toBe(None))
      test("encode/decode", () => v |> Basic.encode |> Basic.decode |> expect |> toEqual(v))
    }

    describe("make", () =>
      Basic.make(~stringField=Some("The answer"), ~int32Field=Some(42), ())->testTypeSupport
    )

    describe("as record", () =>
      {
        stringField: Some("The answer"),
        int32Field: Some(42),
      }->testTypeSupport
    )

    describe("defaults", () => {
      let v = Basic.make()
      test("string", () => v.stringField |> expect |> toBe(None))
      test("int32", () => v.int32Field |> expect |> toBe(None))
      test("encode empty", () =>
        v |> Basic.encode |> Js_typed_array.ArrayBuffer.byteLength |> expect |> toBe(0)
      )
      test("encode/decode", () => v |> Basic.encode |> Basic.decode |> expect |> toEqual(v))
    })
  })

  describe("required", () => {
    let testTypeSupport = (v: Required.t) => {
      test("string", () => v.stringField |> expect |> toBe("The answer"))
      test("int32", () => v.int32Field |> expect |> toBe(42))
      // test("verify", () => v |> Required.verify |> expect |> toBe(None))
      test("encode/decode", () => v |> Required.encode |> Required.decode |> expect |> toEqual(v))
    }

    describe("make", () =>
      Required.make(~stringField="The answer", ~int32Field=42, ())->testTypeSupport
    )

    describe("as record", () =>
      {
        stringField: "The answer",
        int32Field: 42,
      }->testTypeSupport
    )

    describe("defaults", () => {
      let v = Required.make()
      test("string", () => v.stringField |> expect |> toBe(""))
      test("int32", () => v.int32Field |> expect |> toBe(0))
      test("encode empty", () =>
        v |> Required.encode |> Js_typed_array.ArrayBuffer.byteLength |> expect |> toBe(4)
      )
      test("encode/decode", () => v |> Required.encode |> Required.decode |> expect |> toEqual(v))
    })
  })

  describe("typeful", () => {
    describe("string", () => {
      let v = Typeful.make(~stringField=Some("The answer"), ())
      test("value", () => v.stringField |> expect |> toBe(Some("The answer")))
      test("encode/decode", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> (v => v.stringField)
        |> expect
        |> toBe(Some("The answer"))
      )
      let empty = Typeful.make()
      test("empty", () => empty.stringField |> expect |> toBe(None))
      test("empty encode/decode", () =>
        empty |> Typeful.encode |> Typeful.decode |> (v => v.stringField) |> expect |> toBe(None)
      )
    })

    describe("int32", () => {
      let v = Typeful.make(~int32Field=Some(4), ())
      test("value", () => v.int32Field |> expect |> toBe(Some(4)))
      test("encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> (v => v.int32Field) |> expect |> toBe(Some(4))
      )
      let empty = Typeful.make()
      test("empty", () => empty.int32Field |> expect |> toBe(None))
      test("empty encode/decode", () =>
        empty |> Typeful.encode |> Typeful.decode |> (v => v.int32Field) |> expect |> toBe(None)
      )
    })

    describe("int64", () => {
      let testEncode = (v, f, ()) =>
        v |> Typeful.encode |> Typeful.decode |> (v => v.int64Field) |> expect |> toEqual(f)
      let int64Field = Some(Int64.of_string("4"))
      let v = Typeful.make(~int64Field, ())
      test("value", () => v.int64Field |> expect |> toEqual(int64Field))
      test("encode/decode", testEncode(v, int64Field))
      let v = Typeful.make()
      test("empty", () => v.int64Field |> expect |> toBe(None))
      test("empty encode/decode", testEncode(v, None))
      let largeString = "9007199254740992" // Number.MAX_SAFE_INTEGER + 1
      let int64Field = Some(Int64.of_string(largeString))
      let v = Typeful.make(~int64Field, ())
      test("maxvalue", () => v.int64Field |> expect |> toEqual(int64Field))
      test("maxvalue encode/decode", testEncode(v, int64Field))
      let int64Field = Some(Int64.of_string("4"))
      let v = Typeful.make(~int64Field, ())
      test("negative", () => v.int64Field |> expect |> toEqual(int64Field))
      test("negative encode/decode", testEncode(v, int64Field))
      let int64Field = Some(Int64.of_string("-" ++ largeString))
      let v = Typeful.make(~int64Field, ())
      test("minvalue", () => v.int64Field |> expect |> toEqual(int64Field))
      test("minvalue encode/decode", testEncode(v, int64Field))
    })

    describe("enum", () => {
      let testEnum = (v, f, ()) =>
        v |> Typeful.encode |> Typeful.decode |> (v => v.enumField) |> expect |> toEqual(f)
      let enumField = Some(EnumType.EnumV2)
      let v = Typeful.make(~enumField, ())
      test("value", () => v.enumField |> expect |> toBe(enumField))
      test("encode/decode", testEnum(v, enumField))
      let v = Typeful.make()
      test("empty", () => v.enumField |> expect |> toBe(None))
      test("empty encode/decode", testEnum(v, None))
      let testEnumE = (v, f, ()) =>
        v |> Typeful.encode |> Typeful.decode |> (v => v.enumEField) |> expect |> toEqual(f)
      let enumEField = Some(Typeful.EnumTypeE.EnumVE2)
      let v = Typeful.make(~enumEField, ())
      test("value embedded", () => v.enumEField |> expect |> toBe(enumEField))
      test("encode/decode embedded", testEnumE(v, enumEField))
      let v = Typeful.make()
      test("empty embedded", () => v.enumEField |> expect |> toBe(None))
      test("empty encode/decode embedded", testEnumE(v, None))
    })

    describe("message", () => {
      let testMessage = (v, f, ()) =>
        v |> Typeful.encode |> Typeful.decode |> (v => v.basicField) |> expect |> toEqual(f)
      let basicField = Some(Basic.make(~stringField=Some("The answer"), ~int32Field=Some(42), ()))
      let v = Typeful.make(~basicField, ())
      test("value", () => v.basicField |> expect |> toEqual(basicField))
      test("encode/decode", testMessage(v, basicField))
      let v = Typeful.make()
      test("empty", () => v.basicField |> expect |> toEqual(None))
      test("empty encode/decode", testMessage(v, None))
    })

    describe("oneof", () => {
      let testMessage = (v, f, ()) =>
        v |> Typeful.encode |> Typeful.decode |> (v => v.valueField) |> expect |> toEqual(f)
      let valueField = Typeful.Oneof.ValueField.Int32Value(42)
      let v = Typeful.make(~valueField, ())
      test("value case 0", () => v.valueField |> expect |> toEqual(valueField))
      test("encode/decode case 0", testMessage(v, valueField))
      let valueField = Typeful.Oneof.ValueField.Int64Value(Int64.of_string("4"))
      let v = Typeful.make(~valueField, ())
      test("value oneof case 1", () => v.valueField |> expect |> toEqual(valueField))
      test("encode/decode case 1", testMessage(v, valueField))
      let v = Typeful.make()
      test("empty", () => v.valueField |> expect |> toEqual(Typeful.Oneof.ValueField.None))
      test("empty encode/decode", testMessage(v, Typeful.Oneof.ValueField.None))
    })

    describe("repeated", () => {
      let testMessage = (v, f, ()) =>
        v |> Typeful.encode |> Typeful.decode |> (v => v.repeatedStringField) |> expect |> toEqual(f)
      let repeatedStringField = ["a", "b", "c"]
      let v = Typeful.make(~repeatedStringField, ())
      test("value", () => v.repeatedStringField |> expect |> toEqual(repeatedStringField))
      test("encode/decode ", testMessage(v, repeatedStringField))
      let v = Typeful.make()
      test("empty", () => v.repeatedStringField |> expect |> toEqual([]))
      test("empty encode/decode", testMessage(v, []))
    })
  })
})
