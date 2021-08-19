let validateName = name => {
  switch name === "" {
  | true => "Name is mandatory"
  | false => ""
  }
}

let validateScore = score => {
  switch score === 0 {
  | true => "Hint: positive?"
  | false => ""
  }
}

let fixedHelperText = value => {
  switch value !== "" {
  | true => value
  | false => " "
  }
}
