open Jest
open Expect

describe("Protobuf field types support", () => {
  open Proto.TypeTest

  describe("basic", () => {
    let testTypeSupport = (v: Basic.t) => {
      test("string", () => v.stringField |> expect |> toBe("The answer"))
      test("int32", () => v.int32Field |> expect |> toBe(42))
      // test("verify", () => v |> Basic.verify |> expect |> toBe(None))
      test("encode/decode", () => v |> Basic.encode |> Basic.decode |> expect |> toEqual(v))
    }

    describe("make", () =>
      Basic.make(~stringField="The answer", ~int32Field=42, ())->testTypeSupport
    )

    describe("as record", () =>
      {
        stringField: "The answer",
        int32Field: 42,
      }->testTypeSupport
    )

    describe("defaults", () => {
      let v = Basic.make()
      test("string", () => v.stringField |> expect |> toBe(""))
      test("int32", () => v.int32Field |> expect |> toBe(0))
      test("encode empty", () =>
        v |> Basic.encode |> Js_typed_array.ArrayBuffer.byteLength |> expect |> toBe(4)
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
      let v = Typeful.make(~stringField="The answer", ())
      test("value", () => v.stringField |> expect |> toBe("The answer"))
      test("encode/decode", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> (v => v.stringField)
        |> expect
        |> toBe("The answer")
      )
      let empty = Typeful.make()
      test("empty", () => empty.stringField |> expect |> toBe(""))
      test("empty encode/decode", () =>
        empty |> Typeful.encode |> Typeful.decode |> (v => v.stringField) |> expect |> toBe("")
      )
    })

    describe("int32", () => {
      let v = Typeful.make(~int32Field=4, ())
      test("value", () => v.int32Field |> expect |> toBe(4))
      test("encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> (v => v.int32Field) |> expect |> toBe(4)
      )
      let empty = Typeful.make()
      test("empty", () => empty.int32Field |> expect |> toBe(0))
      test("empty encode/decode", () =>
        empty |> Typeful.encode |> Typeful.decode |> (v => v.int32Field) |> expect |> toBe(0)
      )
    })

    let testInt64 = (makeValue, getField) => {
      let v = makeValue(Int64.of_string("4"))
      test("value", () => v |> getField |> Int64.to_string |> expect |> toBe("4"))
      test("encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> Int64.to_string |> expect |> toBe("4")
      )
      let v = Typeful.make()
      test("empty", () => v |> getField |> Int64.to_string |> expect |> toBe("0"))
      test("empty encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> Int64.to_string |> expect |> toBe("0")
      )
      let largeString = "9007199254740992" // Number.MAX_SAFE_INTEGER + 1
      let v = makeValue(Int64.of_string(largeString))
      test("maxvalue", () => v |> getField |> Int64.to_string |> expect |> toBe(largeString))
      test("maxvalue encode/decode", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> getField
        |> Int64.to_string
        |> expect
        |> toBe(largeString)
      )
      let v = makeValue(Int64.of_string("-4"))
      test("negative", () => v |> getField |> Int64.to_string |> expect |> toBe("-4"))
      test("negative encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> Int64.to_string |> expect |> toBe("-4")
      )
      let largeNegativeString = "-" ++ largeString
      let v = makeValue(Int64.of_string(largeNegativeString))
      test("maxvalue", () =>
        v |> getField |> Int64.to_string |> expect |> toBe(largeNegativeString)
      )
      test("maxvalue encode/decode", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> getField
        |> Int64.to_string
        |> expect
        |> toBe(largeNegativeString)
      )
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

    describe("bytes", () => {
      let buffer = Js_typed_array.Uint8Array.make([1, 2, 3, 4, 0, 255, 254])
      let v = Typeful.make(~bytesField=buffer, ())
      test("value", () => v.bytesField |> expect |> toBe(buffer))
      test("encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> (v => v.bytesField) |> expect |> toEqual(buffer)
      )
      let empty = Typeful.make()
      let buffer = Js_typed_array.Uint8Array.make([])
      test("empty", () => empty.bytesField |> expect |> toEqual(buffer))
      test("empty encode/decode", () =>
        empty
        |> Typeful.encode
        |> Typeful.decode
        |> (v => v.bytesField)
        |> expect
        |> toEqual(buffer)
      )
      let v = Typeful.make(~bytesField=buffer, ())
      test("zero length", () => v.bytesField |> expect |> toEqual(buffer))
    })

    describe("enum", () => {
      let v = Typeful.make(~enumField=EnumType.EnumV2, ())
      test("value", () => v.enumField |> expect |> toBe(EnumType.EnumV2))
      test("encode/decode", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> (v => v.enumField)
        |> expect
        |> toBe(EnumType.EnumV2)
      )
      let v = Typeful.make()
      test("empty", () => v.enumField |> expect |> toBe(EnumType.EnumV0))
      test("empty encode/decode", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> (v => v.enumField)
        |> expect
        |> toBe(EnumType.EnumV0)
      )
      let v = Typeful.make(~enumEField=Typeful.EnumTypeE.EnumVE2, ())
      test("value embedded", () => v.enumEField |> expect |> toBe(Typeful.EnumTypeE.EnumVE2))
      test("encode/decode embedded", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> (v => v.enumEField)
        |> expect
        |> toBe(Typeful.EnumTypeE.EnumVE2)
      )
      let v = Typeful.make()
      test("empty embedded", () => v.enumEField |> expect |> toBe(Typeful.EnumTypeE.EnumVE0))
      test("empty encode/decode embedded", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> (v => v.enumEField)
        |> expect
        |> toBe(Typeful.EnumTypeE.EnumVE0)
      )
    })

    describe("message", () => {
      let v = Typeful.make(
        ~basicField=Basic.make(~stringField="The answer", ~int32Field=42, ()),
        (),
      )
      test("value", () =>
        v.basicField |> expect |> toEqual(({stringField: "The answer", int32Field: 42}: Basic.t))
      )
      test("encode/decode", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> (v => v.basicField)
        |> expect
        |> toEqual(({stringField: "The answer", int32Field: 42}: Basic.t))
      )
      let v = Typeful.make()
      test("empty", () =>
        v.basicField |> expect |> toEqual(({stringField: "", int32Field: 0}: Basic.t))
      )
      test("empty encode/decode", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> (v => v.basicField)
        |> expect
        |> toEqual(({stringField: "", int32Field: 0}: Basic.t))
      )
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
  })
})
