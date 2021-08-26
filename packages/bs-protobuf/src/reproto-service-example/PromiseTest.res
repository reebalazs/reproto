
type rec stream<'a> =
  | Message('a, Promise.t<stream<'a>>)
  | Terminator
type rec pStream<'a> = Promise.t<stream<'a>>

let rec wait = (cnt: int) => {
  open Js.Global

  Promise.make((resolve, _reject) => {
    let _ = setTimeout(() => {
      switch cnt {
      | 0 => resolve(. Terminator)
      | c_ => resolve(. Message(c_, wait(c_ - 1)))
      }
    }, 1000)
  })
}

let promiseTest = () => {
  open Promise

  let consume = p =>
    make((terminate, _reject) => {
      let rec consumeNext = p => {
        p
        ->then(stream => {
          switch stream {
          | Terminator => {
              Js.log("Terminated")
              terminate(. ignore())
            }
          | Message(v, next) => {
              Js.log("As promised:" ++ Js.Int.toString(v))
              consumeNext(next)
            }
          }->resolve
        })
        ->ignore
      }
      consumeNext(p)
    })

  wait(5)
  ->consume
  ->then(_ => {
    Js.log("Terminated final CATCH")->resolve
  })

}
