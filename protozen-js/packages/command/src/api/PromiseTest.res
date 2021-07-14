open Belt

type rec stream<'a> = {v: 'a, next: Promise.t<option<stream<'a>>>}
type oStream<'a> = option<stream<'a>>

let rec wait = (cnt: int) => {
  open Js.Global

  Promise.make((resolve, _reject) => {
    let _ = setTimeout(() => {
      switch cnt {
      | 0 => resolve(. None)
      | c_ => resolve(. Some({v: c_, next: wait(c_ - 1)}))
      }
    }, 1000)
  })
}

let promiseTest = () => {
  open Promise

  let rec consume = p =>
    make((terminate, _reject) => {
      let rec consumeNext = p => {
        p
        ->then(oStream => {
          switch oStream {
          | None => {
              Js.log("Terminated")
              terminate(. ignore())
            }
          | Some(s_) => {
              Js.log("As promised:" ++ Js.Int.toString(s_.v))
              consumeNext(s_.next)
            }
          }->resolve
        })
        ->ignore
      }
      consumeNext(p)
    })

  wait(5)
  ->consume
  ->then(result => {
    Js.log("Terminated final CATCH")->resolve
  })

}
