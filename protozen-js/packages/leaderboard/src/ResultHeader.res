open Belt
open State
@react.component
let make = (~state, ~dispatch) => {
  let (isEditing, edit) = React.useState(_ => false)

  switch state.mode {
  | Adding => <ResultHeaderAdding state={state} dispatch={dispatch} />
  | _ => <ResultHeaderShowing state={state} dispatch={dispatch} />
  }
}
