open Belt
@react.component
let app = () => {
  open Promise
  // open Proto
  // open Services
  open MUI
  open CssJs
  open ProtozenService.Connection
  open ProtozenService.Proto
  open Services

  let (message, setMessage) = React.useState(_ => "Oh-oh. You gotta get schwifty.")
  let (results, setResults) = React.useState(_ => list{})

  let connection = createConnection(~url="http://127.0.0.1:8030", ~protoJs=protoJs, ())
  let sendMessage = () => {
    connection
//    ->HelloService.World.call({world: message})
    ->HelloService.World.make(~world=message, ())
    ->then(({v: {world}}) => {
      setResults(_ => list{world ++ " @ " ++ Js.Date.make()->Js.Date.toTimeString, ...results})
      resolve()
    })
    ->ignore
  }

  let resultComponents =
    results
    ->List.toArray
    ->Array.mapWithIndex((index, txt) => <div key={Int.toString(index)}> {React.string(txt)} </div>)
    ->React.array

  <div>
    <div
      className={style(. [display(#flex), marginBottom(8->px)])}
      onKeyDown={event => {
        let key = ReactEvent.Keyboard.key(event)
        switch key {
        | "Enter" => sendMessage()
        | _ => ()
        }
      }}>
      <TextField
        label={"Message"->React.string}
        variant=#Filled
        className={style(. [flexGrow(1.0), flexShrink(1.0), flex(#auto)])}
        value={TextField.Value.string(message)}
        onChange={event => {
          let value = ReactEvent.Form.currentTarget(event)["value"]
          setMessage(_ => value)
        }}
      />
      <IconButton color=#Primary onClick={_ => sendMessage()}> <AddCircleIcon /> </IconButton>
    </div>
    {resultComponents}
  </div>
}
