open Express
open ProtozenService.Proto
open Services

let app = expressCjs()

app->use((_req, res, next) => {
  let _ =
    res
    ->append("Access-Control-Allow-Origin", "*")
    ->append("Access-Control-Allow-Methods", "PUT")
    ->append("Access-Control-Allow-Headers", "content-type,x-protozen-api-key,x-protozen-api-token")
  next()
})

app->use(rawMiddlewareWithOptions({"type": "application/x-protobuf"}))

app->put("/api/1.0/services/hello_service/world", (req, res) => {
  open HelloService.World
  let {world} = req->body->Request.decode
  Js.log("RQ hello_service/world: " ++ world)
  let respWorld = world ++ " - Oh, yeah! Take off your pants and your panties. Shit on the floor."
  let respPayload = Response.make(~world=respWorld, ())->Response.encode
  res->set("content-type", "application/x-protobuf")
  res->status(200)->send(respPayload)->ignore
})

app->useWithError((err, _req, res, _next) => {
  Js.Console.error(err)
  let _ = res->status(500)->endWithData("An error occured")
})

let demoServer = () =>
  Promise.make((_, _) => {
    let port = 8030
    let _ = app->listenWithCallback(port, _ => {
      Js.Console.log(`Listening on http://localhost:${port->Belt.Int.toString}`)
    })
  })
