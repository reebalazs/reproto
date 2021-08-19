open Belt
open State
open Action
let reducer = (state, action) => {
  switch action {
  | EditMode(id) => {...state, mode: Editing(id)}
  | AddMode => {...state, mode: Adding}
  | ShowMode => {...state, mode: Showing}
  | AddResult({name, score}) => {
      ...state,
      results: {
        let id = Uuid.v4()
        state.results->Map.set((id, score), {id: id, name: name, score: score})
      },
    }
  | UpdateResult({result, name, score}) => {
      ...state,
      results: {
        let {id, score: oldScore} = result
        state.results
        ->Map.remove((id, oldScore))
        ->Map.set((id, score), {id: id, name: name, score: score})
      },
    }
  | RemoveResult(result) => {
      ...state,
      results: {
        state.results->Map.remove((result.id, result.score))
      },
    }
//  | _ => initialState
  }
}
