open Belt
open Jest
open Expect
open MockJs

let getArrayIndex = (i, a) =>
  switch a[i] {
  | Some(v) => v
  | None => raise(Not_found)
  }

describe("mocking", () => {
  beforeEach(JestJs.clearAllMocks)

  let mockCb0 = JestJs.fn(() => "DAY")
  let cb0 = mockCb0 |> MockJs.fn
  test("cb0 works", () => cb0() |> expect |> toBe("DAY"))
  test("cb0 calls", () => {
    let _ = cb0()
    mockCb0 |> calls |> Js.Array.length |> expect |> toBe(1)
  })

  let mockCb1 = JestJs.fn(v => "DAY " ++ Int.toString(v))
  let cb1 = mockCb1 |> MockJs.fn
  test("cb1 works", () => cb1(43) |> expect |> toBe("DAY 43"))
  test("cb1 calls", () => {
    let _ = cb1(43)
    mockCb1 |> calls |> Js.Array.length |> expect |> toBe(1)
  })

  // Intended usage of inferred is unclear to me
  let mockCbI = JestJs.inferred_fn()
  let cbI = mockCbI |> MockJs.fn
  test("cb inferred calls", () => {
    let _ = cbI(. "anything")
    mockCbI |> calls |> Js.Array.length |> expect |> toBe(1)
  })

  // A function that takes another function as parameter

  let f = (v, cb) => cb() ++ " " ++ Int.toString(v)

  test("without mock", () => f(13, () => "Friday") |> expect |> toBe("Friday 13"))

  // We don't know if it's Friday today. So we have to start mocking.

  test("with mock works", () => f(13, cb0) |> expect |> toBe("DAY 13"))
  test("with mock calls", () => {
    let _ = f(13, cb0)
    mockCb0 |> calls |> Js.Array.length |> expect |> toBe(1)
  })
  test("with mock input", () => {
    let _ = f(13, cb0)
    mockCb0 |> calls |> getArrayIndex(0) |> expect |> toEqual()
  })
})
