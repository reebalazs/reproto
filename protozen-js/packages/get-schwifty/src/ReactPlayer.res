@module("react-player") @react.component
external make: (
  ~url: string,
  ~playing: bool=?,
  ~width: string=?,
  ~height: string=?,
) => React.element = "default"
