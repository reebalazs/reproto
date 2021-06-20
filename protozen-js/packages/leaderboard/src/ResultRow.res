open State
@react.component
let make = (~result, ~rank, ~state, ~dispatch) => {
  let editingThis = switch state.mode {
  | Editing(editingResult) => editingResult.id === result.id
  | _ => false
  }
  switch editingThis {
  | true => <ResultRowEditing result={result} rank={rank} dispatch={dispatch} />
  | _ => <ResultRowShowing result={result} rank={rank} state={state} dispatch={dispatch} />
  }
}
