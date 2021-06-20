@react.component
let make = () => {
  let (state, dispatch) = React.useReducer(Reducer.reducer, State.initialState)
  Js.log(state)

  <ResultTable state={state} dispatch={dispatch} />
}
