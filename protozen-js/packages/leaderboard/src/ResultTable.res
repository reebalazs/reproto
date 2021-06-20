open Belt
open State
@react.component
let make = (~state, ~dispatch) => {
  open MaterialUi

  let resultComponents =
    state.results
    ->Map.valuesToArray
    ->Array.mapWithIndex((index, result) =>
      <ResultRow
        key={result.id} result={result} rank={index + 1} state={state} dispatch={dispatch}
      />
    )
    ->React.array

  <Table stickyHeader={true}  style={ReactDOM.Style.make(~paddingTop="25px", ())}>
    <ResultHeader state={state} dispatch={dispatch} /> <TableBody> {resultComponents} </TableBody>
  </Table>
}
