open Belt
open State
@react.component
let make = (~result, ~rank, ~dispatch) => {
  open MaterialUi
  open Icons
  open Action
  open EventHelpers
  open ValidateHelpers

  let (name, setName) = React.useState(() => result.name)
  let (score, setScore) = React.useState(() => result.score)
  let (invalidName, setInvalidName) = React.useState(() => false)
  let (invalidNameHelper, setInvalidNameHelper) = React.useState(() => validateName(name))
  let (hintScoreHelper, setHintScoreHelper) = React.useState(() => validateScore(score))

  let isInvalid = () => {
    invalidName
  }

  <TableRow>
    <TableCell align=#Right> {React.string(Js.Int.toString(rank))} </TableCell>
    <TableCell padding=#None>
      <TextField
        label={"Name"->React.string}
        helperText={invalidNameHelper->fixedHelperText->React.string}
        error={invalidNameHelper !== ""}
        variant=#Filled
        fullWidth={true}
        value={TextField.Value.string(name)}
        onChange={(event: ReactEvent.Form.t) => {
          let value = onChangeName(event)
          let valueHelper = validateName(value)
          setInvalidName(_ => valueHelper !== "")
          setInvalidNameHelper(_ => valueHelper)
          setName(_ => value)
        }}
      />
    </TableCell>
    <TableCell padding=#None>
      <TextField
        label={"Score"->React.string}
        helperText={hintScoreHelper->fixedHelperText->React.string}
        variant=#Filled
        fullWidth={true}
        _InputProps={"type": "number"}
        value={TextField.Value.string(score === 0 ? "" : Int.toString(score))}
        onChange={(event: ReactEvent.Form.t) => {
          let value = onChangeScore(event)
          let valueHelper = validateScore(value)
          setHintScoreHelper(_ => valueHelper)
          setScore(_ => value)
        }}
      />
    </TableCell>
    <TableCell>
      <IconButton
        color=#Primary
        disabled={isInvalid()}
        onClick={_ => {
          dispatch(UpdateResult({result: result, name: name, score: score}))
          dispatch(ShowMode)
        }}>
        <CheckCircleIcon />
      </IconButton>
      <IconButton color=#Secondary onClick={_ => dispatch(ShowMode)}> <CancelIcon /> </IconButton>
    </TableCell>
  </TableRow>
}
