open Jest
open Expect
open Belt

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

    describe("make2", () =>
      Basic.make2(~stringField="The answer", ~int32Field=42, ())->testTypeSupport
    )

    describe("as record", () =>
      {
        stringField: "The answer",
        int32Field: 42,
      }->testTypeSupport
    )

    let testTypeSupportEmpty = (v: Basic.t) => {
      test("string", () => v.stringField |> expect |> toBe(""))
      test("int32", () => v.int32Field |> expect |> toBe(0))
      test("encode empty", () =>
        v |> Basic.encode |> Js_typed_array.ArrayBuffer.byteLength |> expect |> toBe(4)
      )
      test("encode/decode", () => v |> Basic.encode |> Basic.decode |> expect |> toEqual(v))
    }

    describe("defaults make", () => {
      Basic.make()->testTypeSupportEmpty
    })

    describe("defaults make2", () => {
      Basic.make2()->testTypeSupportEmpty
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

    describe("make2", () =>
      Required.make2(~stringField="The answer", ~int32Field=42, ())->testTypeSupport
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

  describe("capitalization", () => {
    let testTypeSupport = (v: Capitalization.t) => {
      test("string", () => v.stringField |> expect |> toBe("The answer"))
      test("int32", () => v.int32Field |> expect |> toBe(42))
      // test("verify", () => v |> Capitalization.verify |> expect |> toBe(None))
      test("encode/decode", () =>
        v |> Capitalization.encode |> Capitalization.decode |> expect |> toEqual(v)
      )
    }

    describe("make", () =>
      Capitalization.make(~stringField="The answer", ~int32Field=42, ())->testTypeSupport
    )

    describe("make2", () =>
      Capitalization.make(~stringField="The answer", ~int32Field=42, ())->testTypeSupport
    )

    describe("as record", () =>
      {
        stringField: "The answer",
        int32Field: 42,
      }->testTypeSupport
    )

    let testTypeSupportEmpty = (v: Capitalization.t) => {
      test("string", () => v.stringField |> expect |> toBe(""))
      test("int32", () => v.int32Field |> expect |> toBe(0))
      test("encode empty", () =>
        v |> Capitalization.encode |> Js_typed_array.ArrayBuffer.byteLength |> expect |> toBe(4)
      )
      test("encode/decode", () =>
        v |> Capitalization.encode |> Capitalization.decode |> expect |> toEqual(v)
      )
    }

    describe("defaults make", () => {
      Capitalization.make()->testTypeSupportEmpty
    })

    describe("defaults make2", () => {
      Capitalization.make2()->testTypeSupportEmpty
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

    describe("bool", () => {
      let v = Typeful.make(~boolField=true, ())
      test("value", () => v.boolField |> expect |> toBe(true))
      test("encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> (v => v.boolField) |> expect |> toBe(true)
      )
      let empty = Typeful.make()
      test("empty", () => empty.boolField |> expect |> toBe(false))
      test("empty encode/decode", () =>
        empty |> Typeful.encode |> Typeful.decode |> (v => v.boolField) |> expect |> toBe(false)
      )
    })

    let testInt32 = (makeValue, getField) => {
      let v = makeValue(4)
      test("value", () => v |> getField |> expect |> toBe(4))
      test("encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> expect |> toBe(4)
      )
      let field = -4
      let v = makeValue(field)
      test("negative", () => v |> getField |> expect |> toBe(field))
      test("negative encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> expect |> toBe(field)
      )
      let maxSafe = 2147483647
      let field = maxSafe
      let v = makeValue(field)
      test("max safe", () => v |> getField |> expect |> toBe(field))
      test("max safe encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> expect |> toBe(field)
      )
      let field = -maxSafe
      let v = makeValue(field)
      test("min safe", () => v |> getField |> expect |> toBe(field))
      test("min safe encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> expect |> toBe(field)
      )
      let empty = Typeful.make()
      test("empty", () => empty |> getField |> expect |> toBe(0))
      test("empty encode/decode", () =>
        empty |> Typeful.encode |> Typeful.decode |> getField |> expect |> toBe(0)
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

    let testFloat = (makeValue, getField) => {
      let field = 3.14
      let v = makeValue(field)
      test("value", () => v |> getField |> expect |> toBe(field))
      test("value encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> expect |> toBeCloseTo(field)
      )
      let field = -3.14
      let v = makeValue(field)
      test("negative", () => v |> getField |> expect |> toBe(field))
      test("negative encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> expect |> toBeCloseTo(field)
      )
      let large = 21474836.0
      let field = large
      let v = makeValue(field)
      test("large", () => v |> getField |> expect |> toBe(field))
      test("large encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> expect |> toBe(field)
      )
      let empty = Typeful.make()
      test("empty", () => empty |> getField |> expect |> toBe(0.0))
      test("empty encode/decode", () =>
        empty |> Typeful.encode |> Typeful.decode |> getField |> expect |> toBe(0.0)
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
      let v = makeValue(field)
      test("large 32", () => v |> getField |> expect |> toBe(field))
      test("large 32 encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> expect |> toBe(field)
      )
      let large64 = 9007199254740992.0
      let field = large64
      let v = makeValue(field)
      test("large 64", () => v |> getField |> expect |> toBe(field))
      test("large 64 encode/decode", () =>
        v |> Typeful.encode |> Typeful.decode |> getField |> expect |> toBe(field)
      )
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
      let repeatedStringField =
        ["a", "b", "c"]->Array.mapWithIndex((i, v) => (i, v))->Map.Int.fromArray
      let v = Typeful.make(~repeatedStringField, ())
      test("value", () => v.repeatedStringField |> expect |> toEqual(repeatedStringField))
      test("encode/decode ", testMessage(v, repeatedStringField))
      let v = Typeful.make()
      test("empty", () => v.repeatedStringField |> expect |> toEqual(Map.Int.empty))
      test("empty encode/decode", testMessage(v, Map.Int.empty))
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

      let testMapInt32 = (makeValue, getField) => {
        let field = Map.Int.fromArray([(1, "foo"), (2, "bar")])
        let v = makeValue(field)
        test("value", () => v |> getField |> expect |> toBe(field))
        test("encode/decode", () =>
          v |> Typeful.encode |> Typeful.decode |> getField |> expect |> toEqual(field)
        )
        let empty = Typeful.make()
        test("empty", () => empty |> getField |> expect |> toEqual(Map.Int.empty))
        test("empty encode/decode", () =>
          empty |> Typeful.encode |> Typeful.decode |> getField |> expect |> toEqual(Map.Int.empty)
        )
      }

      describe("int32 key", () => {
        testMapInt32(
          mapInt32StringField => Typeful.make(~mapInt32StringField, ()),
          v => v.mapInt32StringField,
        )
      })

      describe("uint32 key", () => {
        testMapInt32(
          mapUint32StringField => Typeful.make(~mapUint32StringField, ()),
          v => v.mapUint32StringField,
        )
      })

      describe("sint32 key", () => {
        testMapInt32(
          mapSint32StringField => Typeful.make(~mapSint32StringField, ()),
          v => v.mapSint32StringField,
        )
      })

      describe("fixed32 key", () => {
        testMapInt32(
          mapFixed32StringField => Typeful.make(~mapFixed32StringField, ()),
          v => v.mapFixed32StringField,
        )
      })

      describe("sfixed32 key", () => {
        testMapInt32(
          mapSfixed32StringField => Typeful.make(~mapSfixed32StringField, ()),
          v => v.mapSfixed32StringField,
        )
      })

      let testMapInt64 = (makeValue, getField) => {
        let field = MapInt64.fromArray([
          (Int64.of_string("1"), "foo"),
          (Int64.of_string("2"), "bar"),
        ])
        let v = makeValue(field)
        test("value", () => v |> getField |> expect |> toBe(field))
        test("encode/decode", () =>
          v |> Typeful.encode |> Typeful.decode |> getField |> expect |> toEqual(field)
        )
        let empty = Typeful.make()
        test("empty", () => empty |> getField |> expect |> toEqual(MapInt64.makeEmpty()))
        test("empty encode/decode", () =>
          empty
          |> Typeful.encode
          |> Typeful.decode
          |> getField
          |> expect
          |> toEqual(MapInt64.makeEmpty())
        )
      }

      describe("int64 key", () => {
        testMapInt64(
          mapInt64StringField => Typeful.make(~mapInt64StringField, ()),
          v => v.mapInt64StringField,
        )
      })

      describe("uint64 key", () => {
        testMapInt64(
          mapUint64StringField => Typeful.make(~mapUint64StringField, ()),
          v => v.mapUint64StringField,
        )
      })

      describe("sint64 key", () => {
        testMapInt64(
          mapSint64StringField => Typeful.make(~mapSint64StringField, ()),
          v => v.mapSint64StringField,
        )
      })

      describe("fixed64 key", () => {
        testMapInt64(
          mapFixed64StringField => Typeful.make(~mapFixed64StringField, ()),
          v => v.mapFixed64StringField,
        )
      })

      describe("sfixed64 key", () => {
        testMapInt64(
          mapSfixed64StringField => Typeful.make(~mapSfixed64StringField, ()),
          v => v.mapSfixed64StringField,
        )
      })

      describe("bool key", () => {
        let mapBoolStringField = MapBool.fromArray([(false, "foo"), (true, "bar")])
        let v = Typeful.make(~mapBoolStringField, ())
        test("value", () => v.mapBoolStringField |> expect |> toBe(mapBoolStringField))
        test("encode/decode", () =>
          v
          |> Typeful.encode
          |> Typeful.decode
          |> (v => v.mapBoolStringField)
          |> expect
          |> toEqual(mapBoolStringField)
        )
        let empty = Typeful.make()
        test("empty", () => empty.mapBoolStringField |> expect |> toEqual(MapBool.makeEmpty()))
        test("empty encode/decode", () =>
          empty
          |> Typeful.encode
          |> Typeful.decode
          |> (v => v.mapBoolStringField)
          |> expect
          |> toEqual(MapBool.makeEmpty())
        )
      })
    })
  })

  describe("empty", () => {
    let testTypeSupport = (v: Empty.t) => {
      test("encode/decode", () => v |> Empty.encode |> Empty.decode |> expect |> toEqual(v))
    }
    describe("make", () => Empty.make()->testTypeSupport)
    describe("make2", () => Empty.make2()->testTypeSupport)
    describe("as unit", () => ()->testTypeSupport)

    describe("defaults", () => {
      let v = Empty.make()
      test("encode empty", () =>
        v |> Empty.encode |> Js_typed_array.ArrayBuffer.byteLength |> expect |> toBe(0)
      )
      test("encode/decode", () => v |> Empty.encode |> Empty.decode |> expect |> toEqual(v))
    })
  })

  describe("nested", () => {
    let testTypeSupport = (v: Nested.Message.t) => {
      test("string", () => v.stringField |> expect |> toBe("The answer"))
      test("int32", () => v.int32Field |> expect |> toBe(42))
      // test("verify", () => v |> Nested.Message.verify |> expect |> toBe(None))
      test("encode/decode", () =>
        v |> Nested.Message.encode |> Nested.Message.decode |> expect |> toEqual(v)
      )
    }

    describe("make", () =>
      Nested.Message.make(~stringField="The answer", ~int32Field=42, ())->testTypeSupport
    )

    describe("make2", () =>
      Nested.Message.make2(~stringField="The answer", ~int32Field=42, ())->testTypeSupport
    )

    describe("as record", () =>
      {
        stringField: "The answer",
        int32Field: 42,
      }->testTypeSupport
    )

    let testTypeSupportEmpty = (v: Nested.Message.t) => {
      test("string", () => v.stringField |> expect |> toBe(""))
      test("int32", () => v.int32Field |> expect |> toBe(0))
      test("encode empty", () =>
        v |> Nested.Message.encode |> Js_typed_array.ArrayBuffer.byteLength |> expect |> toBe(4)
      )
      test("encode/decode", () =>
        v |> Nested.Message.encode |> Nested.Message.decode |> expect |> toEqual(v)
      )
    }

    describe("defaults make", () => {
      Nested.Message.make()->testTypeSupportEmpty
    })

    describe("defaults make2", () => {
      Nested.Message.make2()->testTypeSupportEmpty
    })
  })
})
