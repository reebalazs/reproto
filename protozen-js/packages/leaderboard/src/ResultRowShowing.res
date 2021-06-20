open State
@react.component
let make = (~result, ~rank, ~state, ~dispatch) => {
  open MaterialUi
  open Icons
  open Action
  let disabled = state.mode !== Showing

  <TableRow>
    <TableCell align=#Right> {React.string(Js.Int.toString(rank))} </TableCell>
    <TableCell> {React.string(result.name)} </TableCell>
    <TableCell align=#Right> {React.string(Js.Int.toString(result.score))} </TableCell>
    <TableCell>
      <div>
        <IconButton disabled={disabled} color=#Primary onClick={_ => dispatch(EditMode(result))}>
          <EditIcon />
        </IconButton>
        <IconButton
          disabled={disabled} color=#Primary onClick={_ => dispatch(RemoveResult(result))}>
          <DeleteIcon />
        </IconButton>
      </div>
    </TableCell>
  </TableRow>
}
