type protoJs = unit
@module("./Proto.proto.js") @val external protoJs: protoJs = "default"
type serviceRoot
@module("@reproto/bs-protobuf") external _createServiceRoot: _ => serviceRoot = "createServiceRoot"
let createServiceRoot = () => _createServiceRoot(protoJs)
type rec protoStreamNext<'req> = ReprotoBsProtobuf.MethodWrapper.protoStreamNext<'req>
type rec protoStreamCallback<'res> = ReprotoBsProtobuf.MethodWrapper.protoStreamCallback<'res>
let methodWrapper = ReprotoBsProtobuf.MethodWrapper.methodWrapper
module ServiceTest = {
  module HelloWorldRequest = {
    type t = {
      @as("world") world: string,
    }
    let make = (~world="", ()) => {world: world, }
    @module("./Proto.proto.js") @val @scope("serviceTest") external messageClass: _ = "HelloWorldRequest"
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
    @module("./Proto.proto.js") @val @scope("serviceTest") external messageClass: _ = "HelloWorldResponse"
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
      @send external wrapped: (serviceRoot, HelloWorldRequest.t, protoStreamCallback<HelloWorldResponse.t>) => unit = "serviceTest.HelloService/world"
      module Request = HelloWorldRequest
      module Response = HelloWorldResponse
      let call = (serviceRoot, request) => methodWrapper(wrapped, serviceRoot, request)
      let make = (serviceRoot, ~world="", ()) => methodWrapper(wrapped, serviceRoot, {world: world, })
    }
    @module("./Proto.proto.js") @val @scope("serviceTest") external serviceClass: _ = "HelloService"
    @module("@reproto/bs-protobuf") external _create: (serviceRoot, _, _, bool, bool) => serviceRoot = "createService"
    let create = (serviceRoot, wrappedRpcImpl, requestDelimited, responseDelimited) =>
      _create(serviceRoot, serviceClass, ReprotoBsProtobuf.RpcImpl.unwrap(wrappedRpcImpl), requestDelimited, responseDelimited)
  }
}
module ServiceTest3 = {
  module HelloWorldRequest = {
    module Oneof = {
    }
    type t = {
      @as("world") world: option<string>,
    }
    let make = (~world=None, ()) => {world: world, }
    @module("./Proto.proto.js") @val @scope("serviceTest3") external messageClass: _ = "HelloWorldRequest"
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
    module Oneof = {
    }
    type t = {
      @as("world") world: option<string>,
    }
    let make = (~world=None, ()) => {world: world, }
    @module("./Proto.proto.js") @val @scope("serviceTest3") external messageClass: _ = "HelloWorldResponse"
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
      @send external wrapped: (serviceRoot, HelloWorldRequest.t, protoStreamCallback<HelloWorldResponse.t>) => unit = "serviceTest3.HelloService/world"
      module Request = HelloWorldRequest
      module Response = HelloWorldResponse
      let call = (serviceRoot, request) => methodWrapper(wrapped, serviceRoot, request)
      let make = (serviceRoot, ~world=None, ()) => methodWrapper(wrapped, serviceRoot, {world: world, })
    }
    @module("./Proto.proto.js") @val @scope("serviceTest3") external serviceClass: _ = "HelloService"
    @module("@reproto/bs-protobuf") external _create: (serviceRoot, _, _, bool, bool) => serviceRoot = "createService"
    let create = (serviceRoot, wrappedRpcImpl, requestDelimited, responseDelimited) =>
      _create(serviceRoot, serviceClass, ReprotoBsProtobuf.RpcImpl.unwrap(wrappedRpcImpl), requestDelimited, responseDelimited)
  }
}
module TypeTest = {
  module Basic = {
    type t = {
      @as("stringField") stringField: string,
      @as("int32Field") int32Field: int,
    }
    let make = (~stringField="", ~int32Field=0, ()) => {stringField: stringField, int32Field: int32Field, }
    @module("./Proto.proto.js") @val @scope("typeTest") external messageClass: _ = "Basic"
    let encode = v => {
      Js.Obj.empty()
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("stringField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("int32Field", ReprotoBsProtobuf.ProtoTypeSupport.Convert.int32, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.encode(messageClass)
    }
    let decode = (b): t => {
      let m = ReprotoBsProtobuf.ProtoTypeSupport.decode(b, messageClass)
      make()
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("stringField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, m)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("int32Field", ReprotoBsProtobuf.ProtoTypeSupport.Convert.int32, m)
    }
  }
  module Required = {
    type t = {
      @as("stringField") stringField: string,
      @as("int32Field") int32Field: int,
    }
    let make = (~stringField="", ~int32Field=0, ()) => {stringField: stringField, int32Field: int32Field, }
    @module("./Proto.proto.js") @val @scope("typeTest") external messageClass: _ = "Required"
    let encode = v => {
      Js.Obj.empty()
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("stringField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("int32Field", ReprotoBsProtobuf.ProtoTypeSupport.Convert.int32, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.encode(messageClass)
    }
    let decode = (b): t => {
      let m = ReprotoBsProtobuf.ProtoTypeSupport.decode(b, messageClass)
      make()
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("stringField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, m)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("int32Field", ReprotoBsProtobuf.ProtoTypeSupport.Convert.int32, m)
    }
  }
  module EnumType = {
    type t =
      | EnumV0
      | EnumV1
      | EnumV2
  }
  module Typeful = {
    module EnumTypeE = {
      type t =
        | EnumVE0
        | EnumVE1
        | EnumVE2
    }
    module Oneof = {
      module ValueField = {
        type t =
          | Int32Value(int)
          | Int64Value(int64)
          | None
        let choices = (("int32", "int32Value"), ("int64", "int64Value"), )
        let convert = ReprotoBsProtobuf.ProtoTypeSupport.Convert.oneof(choices)
      }
    }
    type t = {
      @as("stringField") stringField: string,
      @as("int32Field") int32Field: int,
      @as("int64Field") int64Field: int64,
      @as("enumField") enumField: EnumType.t,
      @as("enumEField") enumEField: EnumTypeE.t,
      @as("basicField") basicField: Basic.t,
      @as("repeatedStringField") repeatedStringField: array<string>,
      @as("valueField") valueField: Oneof.ValueField.t,
    }
    let make = (~stringField="", ~int32Field=0, ~int64Field=Int64.of_string("0"), ~enumField=EnumType.EnumV0, ~enumEField=EnumTypeE.EnumVE0, ~basicField=Basic.make(), ~repeatedStringField=[], ~valueField=Oneof.ValueField.None, ()) => {stringField: stringField, int32Field: int32Field, int64Field: int64Field, enumField: enumField, enumEField: enumEField, basicField: basicField, repeatedStringField: repeatedStringField, valueField: valueField, }
    @module("./Proto.proto.js") @val @scope("typeTest") external messageClass: _ = "Typeful"
    let encode = v => {
      Js.Obj.empty()
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("stringField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("int32Field", ReprotoBsProtobuf.ProtoTypeSupport.Convert.int32, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("int64Field", ReprotoBsProtobuf.ProtoTypeSupport.Convert.int64, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("enumField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.enum, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("enumEField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.enum, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("basicField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.message, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.MapField.fromR("repeatedStringField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("valueField", Oneof.ValueField.convert, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.encode(messageClass)
    }
    let decode = (b): t => {
      let m = ReprotoBsProtobuf.ProtoTypeSupport.decode(b, messageClass)
      make()
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("stringField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, m)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("int32Field", ReprotoBsProtobuf.ProtoTypeSupport.Convert.int32, m)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("int64Field", ReprotoBsProtobuf.ProtoTypeSupport.Convert.int64, m)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("enumField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.enum, m)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("enumEField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.enum, m)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("basicField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.message, m)
      ->ReprotoBsProtobuf.ProtoTypeSupport.MapField.toR("repeatedStringField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, m)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("valueField", Oneof.ValueField.convert, m)
    }
  }
}
module TypeTest3 = {
  module Basic = {
    module Oneof = {
    }
    type t = {
      @as("stringField") stringField: option<string>,
      @as("int32Field") int32Field: option<int>,
    }
    let make = (~stringField=None, ~int32Field=None, ()) => {stringField: stringField, int32Field: int32Field, }
    @module("./Proto.proto.js") @val @scope("typeTest3") external messageClass: _ = "Basic"
    let encode = v => {
      Js.Obj.empty()
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("stringField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("int32Field", ReprotoBsProtobuf.ProtoTypeSupport.Convert.int32, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.encode(messageClass)
    }
    let decode = (b): t => {
      let m = ReprotoBsProtobuf.ProtoTypeSupport.decode(b, messageClass)
      make()
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("stringField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, m)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("int32Field", ReprotoBsProtobuf.ProtoTypeSupport.Convert.int32, m)
    }
  }
  module Required = {
    type t = {
      @as("stringField") stringField: string,
      @as("int32Field") int32Field: int,
    }
    let make = (~stringField="", ~int32Field=0, ()) => {stringField: stringField, int32Field: int32Field, }
    @module("./Proto.proto.js") @val @scope("typeTest3") external messageClass: _ = "Required"
    let encode = v => {
      Js.Obj.empty()
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("stringField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("int32Field", ReprotoBsProtobuf.ProtoTypeSupport.Convert.int32, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.encode(messageClass)
    }
    let decode = (b): t => {
      let m = ReprotoBsProtobuf.ProtoTypeSupport.decode(b, messageClass)
      make()
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("stringField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, m)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("int32Field", ReprotoBsProtobuf.ProtoTypeSupport.Convert.int32, m)
    }
  }
  module EnumType = {
    type t =
      | EnumV0
      | EnumV1
      | EnumV2
  }
  module Typeful = {
    module EnumTypeE = {
      type t =
        | EnumVE0
        | EnumVE1
        | EnumVE2
    }
    module Oneof = {
      module ValueField = {
        type t =
          | Int32Value(int)
          | Int64Value(int64)
          | None
        let choices = (("int32", "int32Value"), ("int64", "int64Value"), )
        let convert = ReprotoBsProtobuf.ProtoTypeSupport.Convert.oneof(choices)
      }
    }
    type t = {
      @as("stringField") stringField: option<string>,
      @as("int32Field") int32Field: option<int>,
      @as("int64Field") int64Field: option<int64>,
      @as("enumField") enumField: option<EnumType.t>,
      @as("enumEField") enumEField: option<EnumTypeE.t>,
      @as("basicField") basicField: option<Basic.t>,
      @as("repeatedStringField") repeatedStringField: array<string>,
      @as("valueField") valueField: Oneof.ValueField.t,
    }
    let make = (~stringField=None, ~int32Field=None, ~int64Field=None, ~enumField=None, ~enumEField=None, ~basicField=None, ~repeatedStringField=[], ~valueField=Oneof.ValueField.None, ()) => {stringField: stringField, int32Field: int32Field, int64Field: int64Field, enumField: enumField, enumEField: enumEField, basicField: basicField, repeatedStringField: repeatedStringField, valueField: valueField, }
    @module("./Proto.proto.js") @val @scope("typeTest3") external messageClass: _ = "Typeful"
    let encode = v => {
      Js.Obj.empty()
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("stringField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("int32Field", ReprotoBsProtobuf.ProtoTypeSupport.Convert.int32, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("int64Field", ReprotoBsProtobuf.ProtoTypeSupport.Convert.int64, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("enumField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.enum, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("enumEField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.enum, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("basicField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.message, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.MapField.fromR("repeatedStringField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.fromR("valueField", Oneof.ValueField.convert, v)
      ->ReprotoBsProtobuf.ProtoTypeSupport.encode(messageClass)
    }
    let decode = (b): t => {
      let m = ReprotoBsProtobuf.ProtoTypeSupport.decode(b, messageClass)
      make()
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("stringField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, m)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("int32Field", ReprotoBsProtobuf.ProtoTypeSupport.Convert.int32, m)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("int64Field", ReprotoBsProtobuf.ProtoTypeSupport.Convert.int64, m)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("enumField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.enum, m)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("enumEField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.enum, m)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("basicField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.message, m)
      ->ReprotoBsProtobuf.ProtoTypeSupport.MapField.toR("repeatedStringField", ReprotoBsProtobuf.ProtoTypeSupport.Convert.string, m)
      ->ReprotoBsProtobuf.ProtoTypeSupport.Field.toR("valueField", Oneof.ValueField.convert, m)
    }
  }
}
