open State
@react.component
let make = (~state, ~dispatch) => {
  open MaterialUi
  open Icons
  open Action
  let disabled = state.mode !== Showing
  <IconButton disabled={disabled} color=#Primary onClick={_ => dispatch(AddMode)}>
    <AddCircleOutlineIcon />
  </IconButton>
}
