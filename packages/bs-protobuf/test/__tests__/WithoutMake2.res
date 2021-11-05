open Jest
open Expect

describe("Protobuf compilation without make2", () => {
  open ProtoWithoutMake2.TypeTest3

  // Only test the elementary features here, most importantly this will
  // prove that the generated code compiles.

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

  })

})
