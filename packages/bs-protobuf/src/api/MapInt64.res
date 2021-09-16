module Int64Cmp = Belt.Id.MakeComparable({
  type t = int64
  let cmp = (a, b) => Pervasives.compare(a, b)
})
type t<'value> = Belt.Map.t<int64, 'value, Int64Cmp.identity>
let fromArray = array => Belt.Map.fromArray(array, ~id=module(Int64Cmp))
let toArray = Belt.Map.toArray
let makeEmpty = () => Belt.Map.make(~id=module(Int64Cmp))
