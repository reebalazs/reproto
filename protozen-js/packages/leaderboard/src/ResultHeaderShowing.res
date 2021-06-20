open Belt
open State
@react.component
let make = (~state, ~dispatch) => {
  open MaterialUi

  <TableHead>
    <TableRow>
      <TableCell style={ReactDOM.Style.make(~minWidth="100px", ())}  align=#Right>
        {"Rank"->React.string}
      </TableCell>
      <TableCell style={ReactDOM.Style.make(~width="100%", ())}> {"Name"->React.string} </TableCell>
      <TableCell style={ReactDOM.Style.make(~minWidth="100px", ())}  align=#Right>
        {"Score"->React.string}
      </TableCell>
      <TableCell style={ReactDOM.Style.make(~minWidth="100px", ())}>
        <AddResultControl state={state} dispatch={dispatch} />
      </TableCell>
    </TableRow>
  </TableHead>
}
