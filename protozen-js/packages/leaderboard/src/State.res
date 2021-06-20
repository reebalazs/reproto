open Belt

type result = {
  id: string,
  name: string,
  score: int,
}

type rank = int

module ComparableResult = Id.MakeComparable({
  open Pervasives
  type t = (string, int)
  let cmp = ((id1, score1), (id2, score2)) => {
    switch compare(score1, score2) {
    | 0 => compare(id1, id2)
    | x => -x
    }
  }
})


type results = Map.t<(string, int), result, ComparableResult.identity>

type mode =
  | Editing(result)
  | Adding
  | Showing

type state = {
  results: results,
  mode: mode,
}

let initialState: state = {
  results: Map.make(~id=module(ComparableResult)),
  mode: Showing,
}
