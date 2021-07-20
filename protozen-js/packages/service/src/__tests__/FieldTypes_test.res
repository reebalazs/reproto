open Belt
open Jest
open Expect

describe("Encoding proto field types", () => {
  open Proto.TypeTest

  test("trivia", () => {
    let txt = "TXT"
    expect(txt) |> toBe("TXT")
  })

  describe("typeful", () => {
    let v: Typeful.t = { stringField: "TXT",
    int32Field: 0,
    }
    // let encoded = typeful->typefulEncode
    // Js.log("Here")
    test("string value", () => expect(v.stringField) |> toBe("TXT"))
    test("int value", () => expect(v.int32Field) |> toBe(0))

  })

  describe("typeful options with Make", () => {
    let v = Typeful.make(~stringField="TXT", ())
    // let encoded = v->typefulEncode
    test("specified value", () => expect(v.stringField) |> toBe("TXT"))
    test("optional value", () => expect(v.int32Field) |> toBe(0))
  })


})
