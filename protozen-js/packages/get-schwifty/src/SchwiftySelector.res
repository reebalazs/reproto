@react.component
let make = (~onClick) => {
  open MaterialUi
  open Icons
  <div>
    <div> {React.string("Let's get schwifty!")} </div>
    <IconButton color=#Primary onClick={(_: ReactEvent.Mouse.t) => onClick()}>
      <MusicVideoIcon />
    </IconButton>
  </div>
}
