open Belt

let onChangeName = (event: ReactEvent.Form.t) => ReactEvent.Form.currentTarget(event)["value"]

let onChangeScore = (event: ReactEvent.Form.t) => {
  let value =
    ReactEvent.Form.currentTarget(event)["value"]->Int.fromString->Option.getWithDefault(0)
  value < 0 ? 0 : value
}
