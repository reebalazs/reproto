type protoJs = unit
@module("./ProtoDemo.proto.js") @val external protoJs: protoJs = "default"
type serviceRoot
@module("@reproto/bs-protobuf") external _createServiceRoot: _ => serviceRoot = "createServiceRoot"
let createServiceRoot = () => _createServiceRoot(protoJs)
type rec protoStreamNext<'req> = ReprotoBsProtobuf.MethodWrapper.protoStreamNext<'req>
type rec protoStreamCallback<'res> = ReprotoBsProtobuf.MethodWrapper.protoStreamCallback<'res>
let methodWrapper = ReprotoBsProtobuf.MethodWrapper.methodWrapper
module Services = {
  module HelloWorldRequest = {
    type t = {
      @as("world") world: string,
    }
    let make = (~world="", ()) => {world: world, }
    @module("./ProtoDemo.proto.js") @val @scope("services") external messageClass: _ = "HelloWorldRequest"
    let encode = v => {
      Js.Obj.empty()
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("world", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.encode(messageClass)
    }
    let decode = (b): t => {
      let m = ReprotoBsProtobuf.ProtoTypeSupport.decode(b, messageClass)
      make()
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("world", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, m)
    }
  }
  module HelloWorldResponse = {
    type t = {
      @as("world") world: string,
    }
    let make = (~world="", ()) => {world: world, }
    @module("./ProtoDemo.proto.js") @val @scope("services") external messageClass: _ = "HelloWorldResponse"
    let encode = v => {
      Js.Obj.empty()
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("world", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.encode(messageClass)
    }
    let decode = (b): t => {
      let m = ReprotoBsProtobuf.ProtoTypeSupport.decode(b, messageClass)
      make()
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("world", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, m)
    }
  }
  module HelloService = {
    module World = {
      @send external wrapped: (serviceRoot, HelloWorldRequest.t, protoStreamCallback<HelloWorldResponse.t>) => unit = "services.HelloService/world"
      module Request = HelloWorldRequest
      module Response = HelloWorldResponse
      let call = (serviceRoot, request) => methodWrapper(wrapped, serviceRoot, request)
      let make = (serviceRoot, ~world="", ()) => methodWrapper(wrapped, serviceRoot, {world: world, })
    }
    @module("./ProtoDemo.proto.js") @val @scope("services") external serviceClass: _ = "HelloService"
    @module("@reproto/bs-protobuf") external _create: (serviceRoot, _, _, bool, bool) => serviceRoot = "createService"
    let create = (serviceRoot, wrappedRpcImpl, requestDelimited, responseDelimited) =>
      _create(serviceRoot, serviceClass, ReprotoBsProtobuf.RpcImpl.unwrap(wrappedRpcImpl), requestDelimited, responseDelimited)
  }
}
