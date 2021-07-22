open Belt
open Jest
open Expect

describe("Protobuf field types support", () => {
  open Proto.TypeTest

  describe("basic", () => {
    let testTypeSupport = (v: Basic.t) => {
      test("string", () => v.stringField |> expect |> toBe("The answer"))
      test("int32", () => v.int32Field |> expect |> toBe(42))
      test("verify", () => v |> Basic.verify |> expect |> toBe(None))
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

    describe("int64", () => {
      let v = Typeful.make(~int64Field=Int64.of_string("4"), ())
      test("value", () => v.int64Field |> Int64.to_string |> expect |> toBe("4"))
      test("encode/decode", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> (v => v.int64Field)
        |> Int64.to_string
        |> expect
        |> toBe("4")
      )
      let v = Typeful.make()
      test("empty", () => v.int64Field |> Int64.to_string |> expect |> toBe("0"))
      test("empty encode/decode", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> (v => v.int64Field)
        |> Int64.to_string
        |> expect
        |> toBe("0")
      )
      let largeString = "9007199254740992" // Number.MAX_SAFE_INTEGER + 1
      let v = Typeful.make(~int64Field=Int64.of_string(largeString), ())
      test("maxvalue", () => v.int64Field |> Int64.to_string |> expect |> toBe(largeString))
      test("maxvalue encode/decode", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> (v => v.int64Field)
        |> Int64.to_string
        |> expect
        |> toBe(largeString)
      )
      let v = Typeful.make(~int64Field=Int64.of_string("-4"), ())
      test("negative", () => v.int64Field |> Int64.to_string |> expect |> toBe("-4"))
      test("negative encode/decode", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> (v => v.int64Field)
        |> Int64.to_string
        |> expect
        |> toBe("-4")
      )
      let largeNegativeString = "-" ++ largeString
      let v = Typeful.make(~int64Field=Int64.of_string(largeNegativeString), ())
      test("maxvalue", () => v.int64Field |> Int64.to_string |> expect |> toBe(largeNegativeString))
      test("maxvalue encode/decode", () =>
        v
        |> Typeful.encode
        |> Typeful.decode
        |> (v => v.int64Field)
        |> Int64.to_string
        |> expect
        |> toBe(largeNegativeString)
      )
    })
  })
})
