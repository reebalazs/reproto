module BoolCmp = Belt.Id.MakeComparable({
  type t = bool
  let cmp = (a, b) => Pervasives.compare(a, b)
})
type t<'value> = Belt.Map.t<bool, 'value, BoolCmp.identity>
let fromArray = array => Belt.Map.fromArray(array, ~id=module(BoolCmp))
let toArray = Belt.Map.toArray
let makeEmpty = () => Belt.Map.make(~id=module(BoolCmp))
