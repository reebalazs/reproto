
switch ReactDOM.querySelector("#root") {
| Some(root) => ReactDOM.render(<App.make />, root)
| None => Js.log("Error: could not find react element")
}
