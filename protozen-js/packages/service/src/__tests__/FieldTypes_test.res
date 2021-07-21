open Belt
open Jest
open Expect

describe("Protobuf field types support", () => {
  open Proto.TypeTest

  describe("typeful", () => {
    let testTypeSupport = (v: Typeful.t) => {
      test("string", () => expect(v.stringField) |> toBe("The answer"))
      test("int32", () => expect(v.int32Field) |> toBe(42))
      test("verify", () => expect(v->Typeful.verify) |> toBe(None))
      test("encode/decode", () => expect(v->Typeful.encode->Typeful.decode) |> toEqual(v))
    }

    describe("make", () =>
      Typeful.make(~stringField="The answer", ~int32Field=42, ())->testTypeSupport
    )

    describe("as record", () =>
      {
        stringField: "The answer",
        int32Field: 42,
      }->testTypeSupport
    )

    describe("defaults", () => {
      let v = Typeful.make(())
      test("string", () => expect(v.stringField) |> toBe(""))
      test("int32", () => expect(v.int32Field) |> toBe(0))
      test("encode empty", () => expect(v->Typeful.encode->Js_typed_array.ArrayBuffer.byteLength) |> toBe(4))
      test("encode/decode", () => expect(v->Typeful.encode->Typeful.decode) |> toEqual(v))
    })
  })
})
