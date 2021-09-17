open Jest
open Expect
open Belt

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

    describe("bool", () => {
      let v = Typeful.make(~boolField=Some(true), ())
      test("value", () => v.boolField |> expect |> toBe(Some(true)))
      test("encode/decode", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> (v => v.boolField)
        |> expect
        |> toBe(Some(true))
      )
      let empty = Typeful.make()
      test("empty", () => empty.boolField |> expect |> toBe(None))
      test("empty encode/decode", () =>
        empty |> Typeful.encode |> Typeful.decode |> (v => v.boolField) |> expect |> toBe(None)
      )
    })

    let testInt32 = (makeValue, getField) => {
      let v = makeValue(Some(4))
      test("value", () => v |> getField |> expect |> toBe(Some(4)))
      test("encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> expect |> toBe(Some(4))
      )
      let field = -4
      let v = makeValue(Some(field))
      test("negative", () => v |> getField |> expect |> toBe(Some(field)))
      test("negative encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> expect |> toBe(Some(field))
      )
      let maxSafe = 2147483647
      let field = maxSafe
      let v = makeValue(Some(field))
      test("max safe", () => v |> getField |> expect |> toBe(Some(field)))
      test("max safe encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> expect |> toBe(Some(field))
      )
      let field = -maxSafe
      let v = makeValue(Some(field))
      test("min safe", () => v |> getField |> expect |> toBe(Some(field)))
      test("min safe encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> expect |> toBe(Some(field))
      )
      let empty = Typeful.make()
      test("empty", () => empty |> getField |> expect |> toBe(None))
      test("empty encode/decode", () =>
        empty |> Typeful.encode |> Typeful.decode |> getField |> expect |> toBe(None)
      )
    }

    describe("int32", () => {
      testInt32(int32Field => Typeful.make(~int32Field, ()), v => v.int32Field)
    })

    describe("uint32", () => {
      testInt32(uint32Field => Typeful.make(~uint32Field, ()), v => v.uint32Field)
    })

    describe("sint32", () => {
      testInt32(sint32Field => Typeful.make(~sint32Field, ()), v => v.sint32Field)
    })

    describe("fixed32", () => {
      testInt32(fixed32Field => Typeful.make(~fixed32Field, ()), v => v.fixed32Field)
    })

    describe("sfixed32", () => {
      testInt32(sfixed32Field => Typeful.make(~sfixed32Field, ()), v => v.sfixed32Field)
    })

    let testInt64 = (makeValue, getField) => {
      let testEncode = (v, f, ()) =>
        v |> Typeful.encode |> Typeful.decode |> getField |> expect |> toEqual(f)
      let field = Some(Int64.of_string("4"))
      let v = makeValue(field)
      test("value", () => v |> getField |> expect |> toEqual(field))
      test("encode/decode", testEncode(v, field))
      let v = Typeful.make()
      test("empty", () => v |> getField |> expect |> toBe(None))
      test("empty encode/decode", testEncode(v, None))
      let largeString = "9007199254740992" // Number.MAX_SAFE_INTEGER + 1
      let field = Some(Int64.of_string(largeString))
      let v = makeValue(field)
      test("maxvalue", () => v |> getField |> expect |> toEqual(field))
      test("maxvalue encode/decode", testEncode(v, field))
      let field = Some(Int64.of_string("4"))
      let v = makeValue(field)
      test("negative", () => v |> getField |> expect |> toEqual(field))
      test("negative encode/decode", testEncode(v, field))
      let field = Some(Int64.of_string("-" ++ largeString))
      let v = makeValue(field)
      test("minvalue", () => v |> getField |> expect |> toEqual(field))
      test("minvalue encode/decode", testEncode(v, field))
    }

    describe("int64", () => {
      testInt64(int64Field => Typeful.make(~int64Field, ()), v => v.int64Field)
    })

    describe("uint64", () => {
      testInt64(uint64Field => Typeful.make(~uint64Field, ()), v => v.uint64Field)
    })

    describe("sint64", () => {
      testInt64(sint64Field => Typeful.make(~sint64Field, ()), v => v.sint64Field)
    })

    describe("fixed64", () => {
      testInt64(fixed64Field => Typeful.make(~fixed64Field, ()), v => v.fixed64Field)
    })

    describe("sfixed64", () => {
      testInt64(sfixed64Field => Typeful.make(~sfixed64Field, ()), v => v.sfixed64Field)
    })

    let testFloat = (makeValue, getField) => {
      let field = 3.14
      let v = makeValue(Some(field))
      test("value", () => v |> getField |> expect |> toBe(Some(field)))
      test("value encode/decode", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> getField
        |> Option.getExn
        |> expect
        |> toBeCloseTo(field)
      )
      let field = -3.14
      let v = makeValue(Some(field))
      test("negative", () => v |> getField |> expect |> toBe(Some(field)))
      test("negative encode/decode", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> getField
        |> Option.getExn
        |> expect
        |> toBeCloseTo(field)
      )
      let large = 21474836.0
      let field = large
      let v = makeValue(Some(field))
      test("large", () => v |> getField |> expect |> toBe(Some(field)))
      test("large encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> Option.getExn |> expect |> toBe(field)
      )
      let empty = Typeful.make()
      test("empty", () => empty |> getField |> expect |> toBe(None))
      test("empty encode/decode", () =>
        empty |> Typeful.encode |> Typeful.decode |> getField |> expect |> toBe(None)
      )
    }

    describe("float", () => {
      testFloat(floatField => Typeful.make(~floatField, ()), v => v.floatField)
    })

    describe("double", () => {
      let makeValue = doubleField => Typeful.make(~doubleField, ())
      let getField = (v: Typeful.t) => v.doubleField
      testFloat(makeValue, getField)
      let large32 = 2147483647.0
      let field = large32
      let v = makeValue(Some(field))
      test("large 32", () => v |> getField |> expect |> toBe(Some(field)))
      test("large 32 encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> Option.getExn |> expect |> toBe(field)
      )
      let large64 = 9007199254740992.0
      let field = large64
      let v = makeValue(Some(field))
      test("large 64", () => v |> getField |> expect |> toBe(Some(field)))
      test("large 64 encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> Option.getExn |> expect |> toBe(field)
      )
    })

    describe("bytes", () => {
      let buffer = Js_typed_array.Uint8Array.make([1, 2, 3, 4, 0, 255, 254])
      let v = Typeful.make(~bytesField=Some(buffer), ())
      test("value", () => v.bytesField |> expect |> toBe(Some(buffer)))
      test("encode/decode", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> (v => v.bytesField)
        |> expect
        |> toEqual(Some(buffer))
      )
      let empty = Typeful.make()
      test("empty", () => empty.bytesField |> expect |> toBe(None))
      test("empty encode/decode", () =>
        empty |> Typeful.encode |> Typeful.decode |> (v => v.bytesField) |> expect |> toBe(None)
      )
      let buffer = Js_typed_array.Uint8Array.make([])
      let v = Typeful.make(~bytesField=Some(buffer), ())
      test("zero length", () => v.bytesField |> expect |> toBe(Some(buffer)))
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
        v
        |> Typeful.encode
        |> Typeful.decode
        |> (v => v.repeatedStringField)
        |> expect
        |> toEqual(f)
      let repeatedStringField = ["a", "b", "c"]
      let v = Typeful.make(~repeatedStringField, ())
      test("value", () => v.repeatedStringField |> expect |> toEqual(repeatedStringField))
      test("encode/decode ", testMessage(v, repeatedStringField))
      let v = Typeful.make()
      test("empty", () => v.repeatedStringField |> expect |> toEqual([]))
      test("empty encode/decode", testMessage(v, []))
    })

    describe("map", () => {
      describe("string key", () => {
        let mapStringStringField = Map.String.fromArray([("f", "foo"), ("b", "bar")])
        let v = Typeful.make(~mapStringStringField, ())
        test("value", () => v.mapStringStringField |> expect |> toBe(mapStringStringField))
        test("encode/decode", () =>
          v
          |> Typeful.encode
          |> Typeful.decode
          |> (v => v.mapStringStringField)
          |> expect
          |> toEqual(mapStringStringField)
        )
        let empty = Typeful.make()
        test("empty", () => empty.mapStringStringField |> expect |> toEqual(Map.String.empty))
        test("empty encode/decode", () =>
          empty
          |> Typeful.encode
          |> Typeful.decode
          |> (v => v.mapStringStringField)
          |> expect
          |> toEqual(Map.String.empty)
        )
      })

      describe("int key", () => {
        let mapInt32StringField = Map.Int.fromArray([(1, "foo"), (2, "bar")])
        let v = Typeful.make(~mapInt32StringField, ())
        test("value", () => v.mapInt32StringField |> expect |> toBe(mapInt32StringField))
        test("encode/decode", () =>
          v
          |> Typeful.encode
          |> Typeful.decode
          |> (v => v.mapInt32StringField)
          |> expect
          |> toEqual(mapInt32StringField)
        )
        let empty = Typeful.make()
        test("empty", () => empty.mapInt32StringField |> expect |> toEqual(Map.Int.empty))
        test("empty encode/decode", () =>
          empty
          |> Typeful.encode
          |> Typeful.decode
          |> (v => v.mapInt32StringField)
          |> expect
          |> toEqual(Map.Int.empty)
        )
      })

      describe("int64 key", () => {
        let mapInt64StringField = MapInt64.fromArray([
          (Int64.of_string("1"), "foo"),
          (Int64.of_string("2"), "bar"),
        ])
        let v = Typeful.make(~mapInt64StringField, ())
        test("value", () => v.mapInt64StringField |> expect |> toBe(mapInt64StringField))
        test("encode/decode", () =>
          v
          |> Typeful.encode
          |> Typeful.decode
          |> (v => v.mapInt64StringField)
          |> expect
          |> toEqual(mapInt64StringField)
        )
        let empty = Typeful.make()
        test("empty", () => empty.mapInt64StringField |> expect |> toEqual(MapInt64.makeEmpty()))
        test("empty encode/decode", () =>
          empty
          |> Typeful.encode
          |> Typeful.decode
          |> (v => v.mapInt64StringField)
          |> expect
          |> toEqual(MapInt64.makeEmpty())
        )
      })
    })
  })
})
