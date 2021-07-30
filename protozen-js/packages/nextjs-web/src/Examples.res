type props = {
  msg: string,
  href: string,
}

let default = (props: props) =>
  <div>
    {React.string(props.msg)}
    <a href=props.href target="_blank"> {React.string("`src/Examples.res`")} </a>
  </div>

let getServerSideProps = _ctx => {
  let props = {
    msg: "This page was rendered dynamically with getServerSideProps.",
    href: "https://github.com/reebalazs/protozen",
  }
  Js.Promise.resolve({"props": props})
}
