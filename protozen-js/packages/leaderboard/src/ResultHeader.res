open State
@react.component
let make = (~state, ~dispatch) => {

  switch state.mode {
  | Adding => <ResultHeaderAdding dispatch={dispatch} />
  | _ => <ResultHeaderShowing state={state} dispatch={dispatch} />
  }
}
