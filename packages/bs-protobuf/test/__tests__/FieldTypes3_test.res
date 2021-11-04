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

    describe("make2", () =>
      Basic.make2(~stringField=Some("The answer"), ~int32Field=Some(42), ())->testTypeSupport
    )

    describe("as record", () =>
      {
        stringField: Some("The answer"),
        int32Field: Some(42),
      }->testTypeSupport
    )

    let testTypeSupportEmpty = (v: Basic.t) => {
      test("string", () => v.stringField |> expect |> toBe(None))
      test("int32", () => v.int32Field |> expect |> toBe(None))
      test("encode empty", () =>
        v |> Basic.encode |> Js_typed_array.ArrayBuffer.byteLength |> expect |> toBe(0)
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

    let testTypeSupportEmpty = (v: Required.t) => {
      test("string", () => v.stringField |> expect |> toBe(""))
      test("int32", () => v.int32Field |> expect |> toBe(0))
      test("encode empty", () =>
        v |> Required.encode |> Js_typed_array.ArrayBuffer.byteLength |> expect |> toBe(4)
      )
      test("encode/decode", () => v |> Required.encode |> Required.decode |> expect |> toEqual(v))
    }

    describe("defaults make", () => {
      Required.make()->testTypeSupportEmpty
    })

    describe("defaults make2", () => {
      Required.make2()->testTypeSupportEmpty
    })
  })

  describe("capitalization", () => {
    let testTypeSupport = (v: Capitalization.t) => {
      test("string", () => v.stringField |> expect |> toBe(Some("The answer")))
      test("int32", () => v.int32Field |> expect |> toBe(Some(42)))
      // test("verify", () => v |> Capitalization.verify |> expect |> toBe(None))
      test("encode/decode", () =>
        v |> Capitalization.encode |> Capitalization.decode |> expect |> toEqual(v)
      )
    }

    describe("make", () =>
      Capitalization.make(
        ~stringField=Some("The answer"),
        ~int32Field=Some(42),
        (),
      )->testTypeSupport
    )

    describe("make2", () =>
      Capitalization.make2(
        ~stringField=Some("The answer"),
        ~int32Field=Some(42),
        (),
      )->testTypeSupport
    )

    describe("as record", () =>
      {
        stringField: Some("The answer"),
        int32Field: Some(42),
      }->testTypeSupport
    )

    let testTypeSupportEmpty = (v: Capitalization.t) => {
      test("string", () => v.stringField |> expect |> toBe(None))
      test("int32", () => v.int32Field |> expect |> toBe(None))
      test("encode empty", () =>
        v |> Capitalization.encode |> Js_typed_array.ArrayBuffer.byteLength |> expect |> toBe(0)
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
        v |> Typeful.encode |> Typeful.decode |> (v => v.boolField) |> expect |> toBe(Some(true))
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
      test("string", () => v.stringField |> expect |> toBe(Some("The answer")))
      test("int32", () => v.int32Field |> expect |> toBe(Some(42)))
      // test("verify", () => v |> Nested.Message.verify |> expect |> toBe(None))
      test("encode/decode", () =>
        v |> Nested.Message.encode |> Nested.Message.decode |> expect |> toEqual(v)
      )
    }

    describe("make", () =>
      Nested.Message.make(
        ~stringField=Some("The answer"),
        ~int32Field=Some(42),
        (),
      )->testTypeSupport
    )

    describe("make2", () =>
      Nested.Message.make2(
        ~stringField=Some("The answer"),
        ~int32Field=Some(42),
        (),
      )->testTypeSupport
    )

    describe("as record", () =>
      {
        stringField: Some("The answer"),
        int32Field: Some(42),
      }->testTypeSupport
    )

    describe("defaults", () => {
      let v = Nested.Message.make()
      test("string", () => v.stringField |> expect |> toBe(None))
      test("int32", () => v.int32Field |> expect |> toBe(None))
      test("encode empty", () =>
        v |> Nested.Message.encode |> Js_typed_array.ArrayBuffer.byteLength |> expect |> toBe(0)
      )
      test("encode/decode", () =>
        v |> Nested.Message.encode |> Nested.Message.decode |> expect |> toEqual(v)
      )
    })
  })

  describe("resolution", () => {
    describe("in message", () => {
      let v = ResolutionTest.Message.make(
        ~inner=ResolutionTest.Message.Enum1.VInner3,
        ~outer=ResolutionTest.Enum1.VOuter1,
        ~nestedInner=ResolutionTest.Message.Nested.Enum1.VOuter7,
        ~typeInner=ResolutionTest.Message.Type1.make(~inner=Some("INNER"), ()),
        ~typeOuter=ResolutionTest.Type1.make(~outer=Some("OUTER"), ()),
        ~nestedTypeInner=ResolutionTest.Message.Nested.Type1.make(
          ~nestedInner=Some("NESTED-INNER"),
          (),
        ),
        (),
      )
      test("inner", () => v.inner |> expect |> toBe(ResolutionTest.Message.Enum1.VInner3))
      test("outer", () => v.outer |> expect |> toBe(ResolutionTest.Enum1.VOuter1))
      test("nestedInner", () =>
        v.nestedInner |> expect |> toBe(ResolutionTest.Message.Nested.Enum1.VOuter7)
      )
      // Note: nestedOuter resolution in messages is not supported by protobufjs.
      test("typeInner", () => v.typeInner.inner |> expect |> toBe(Some("INNER")))
      test("typeOuter", () => v.typeOuter.outer |> expect |> toBe(Some("OUTER")))
      test("nestedTypeInner", () =>
        v.nestedTypeInner.nestedInner |> expect |> toBe(Some("NESTED-INNER"))
      )
      test("encode/decode", () =>
        v |> ResolutionTest.Message.encode |> ResolutionTest.Message.decode |> expect |> toEqual(v)
      )
    })

    describe("in module", () => {
      let v = Proto.ResolutionTest3.Inner.Message.make(
        ~enumInner=Proto.ResolutionTest3.Inner.Enum1.VInner4,
        ~enumOuter=Proto.ResolutionTest3.Enum1.VOuter1,
        ~enumNestedInner=Proto.ResolutionTest3.Inner.Nested.Enum1.VInnerNested7,
        ~enumNestedOuter=Proto.ResolutionTest3.Nested.Enum1.VOuterNested3,
        ~typeInner=Proto.ResolutionTest3.Inner.Type1.make(~inner=Some("INNER"), ()),
        ~typeOuter=Proto.ResolutionTest3.Type1.make(~outer=Some("OUTER"), ()),
        ~typeNestedInner=Proto.ResolutionTest3.Inner.Nested.Type1.make(
          ~innerNested=Some("INNER-NESTED"),
          (),
        ),
        ~typeNestedOuter=Proto.ResolutionTest3.Nested.Type1.make(
          ~outerNested=Some("OUTER-NESTED"),
          (),
        ),
        (),
      )
      test("enumInner", () =>
        v.enumInner |> expect |> toBe(Proto.ResolutionTest3.Inner.Enum1.VInner4)
      )
      test("enumOuter", () => v.enumOuter |> expect |> toBe(Proto.ResolutionTest3.Enum1.VOuter1))
      test("enumNestedInner", () =>
        v.enumNestedInner |> expect |> toBe(Proto.ResolutionTest3.Inner.Nested.Enum1.VInnerNested7)
      )
      test("enumNestedOuter", () =>
        v.enumNestedOuter |> expect |> toBe(Proto.ResolutionTest3.Nested.Enum1.VOuterNested3)
      )
      test("typeInner", () => v.typeInner.inner |> expect |> toBe(Some("INNER")))
      test("typeOuter", () => v.typeOuter.outer |> expect |> toBe(Some("OUTER")))
      test("typeNestedInner", () =>
        v.typeNestedInner.innerNested |> expect |> toBe(Some("INNER-NESTED"))
      )
      test("typeNestedOuter", () =>
        v.typeNestedOuter.outerNested |> expect |> toBe(Some("OUTER-NESTED"))
      )
      test("encode/decode", () =>
        v
        |> Proto.ResolutionTest3.Inner.Message.encode
        |> Proto.ResolutionTest3.Inner.Message.decode
        |> expect
        |> toEqual(v)
      )
    })
  })
})
