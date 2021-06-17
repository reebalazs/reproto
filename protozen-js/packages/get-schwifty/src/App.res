@react.component
let make = () => {
  let (isShowingVideo, showVideo) = React.useState(_ => false)
  {
    switch isShowingVideo {
    | false => <SchwiftySelector onClick={() => showVideo(_ => true)} />
    | true => <SchwiftyVideo />
    }
  }
}
