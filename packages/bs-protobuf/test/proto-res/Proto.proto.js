/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const serviceTest = $root.serviceTest = (() => {

    const serviceTest = {};

    serviceTest.HelloWorldRequest = (function() {

        function HelloWorldRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        HelloWorldRequest.prototype.world = "";

        HelloWorldRequest.create = function create(properties) {
            return new HelloWorldRequest(properties);
        };

        HelloWorldRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.world != null && Object.hasOwnProperty.call(message, "world"))
                writer.uint32(10).string(message.world);
            return writer;
        };

        HelloWorldRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        HelloWorldRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.serviceTest.HelloWorldRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.world = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        HelloWorldRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return HelloWorldRequest;
    })();

    serviceTest.HelloWorldResponse = (function() {

        function HelloWorldResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        HelloWorldResponse.prototype.world = "";

        HelloWorldResponse.create = function create(properties) {
            return new HelloWorldResponse(properties);
        };

        HelloWorldResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.world != null && Object.hasOwnProperty.call(message, "world"))
                writer.uint32(10).string(message.world);
            return writer;
        };

        HelloWorldResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        HelloWorldResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.serviceTest.HelloWorldResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.world = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        HelloWorldResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return HelloWorldResponse;
    })();

    serviceTest.HelloService = (function() {

        function HelloService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (HelloService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = HelloService;

        HelloService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };


        Object.defineProperty(HelloService.prototype.world = function world(request, callback) {
            return this.rpcCall(world, $root.serviceTest.HelloWorldRequest, $root.serviceTest.HelloWorldResponse, request, callback);
        }, "name", { value: "World" });

        return HelloService;
    })();

    return serviceTest;
})();

export const serviceTest3 = $root.serviceTest3 = (() => {

    const serviceTest3 = {};

    serviceTest3.HelloWorldRequest = (function() {

        function HelloWorldRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        HelloWorldRequest.prototype.world = "";

        HelloWorldRequest.create = function create(properties) {
            return new HelloWorldRequest(properties);
        };

        HelloWorldRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.world != null && Object.hasOwnProperty.call(message, "world"))
                writer.uint32(10).string(message.world);
            return writer;
        };

        HelloWorldRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        HelloWorldRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.serviceTest3.HelloWorldRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.world = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        HelloWorldRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return HelloWorldRequest;
    })();

    serviceTest3.HelloWorldResponse = (function() {

        function HelloWorldResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        HelloWorldResponse.prototype.world = "";

        HelloWorldResponse.create = function create(properties) {
            return new HelloWorldResponse(properties);
        };

        HelloWorldResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.world != null && Object.hasOwnProperty.call(message, "world"))
                writer.uint32(10).string(message.world);
            return writer;
        };

        HelloWorldResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        HelloWorldResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.serviceTest3.HelloWorldResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.world = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        HelloWorldResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return HelloWorldResponse;
    })();

    serviceTest3.HelloService = (function() {

        function HelloService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (HelloService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = HelloService;

        HelloService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };


        Object.defineProperty(HelloService.prototype.world = function world(request, callback) {
            return this.rpcCall(world, $root.serviceTest3.HelloWorldRequest, $root.serviceTest3.HelloWorldResponse, request, callback);
        }, "name", { value: "World" });

        return HelloService;
    })();

    return serviceTest3;
})();

export const typeTest = $root.typeTest = (() => {

    const typeTest = {};

    typeTest.Basic = (function() {

        function Basic(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        Basic.prototype.stringField = "";
        Basic.prototype.int32Field = 0;

        Basic.create = function create(properties) {
            return new Basic(properties);
        };

        Basic.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.stringField != null && Object.hasOwnProperty.call(message, "stringField"))
                writer.uint32(10).string(message.stringField);
            if (message.int32Field != null && Object.hasOwnProperty.call(message, "int32Field"))
                writer.uint32(16).int32(message.int32Field);
            return writer;
        };

        Basic.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        Basic.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.typeTest.Basic();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.stringField = reader.string();
                    break;
                case 2:
                    message.int32Field = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        Basic.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return Basic;
    })();

    typeTest.Required = (function() {

        function Required(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        Required.prototype.stringField = "";
        Required.prototype.int32Field = 0;

        Required.create = function create(properties) {
            return new Required(properties);
        };

        Required.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(10).string(message.stringField);
            writer.uint32(16).int32(message.int32Field);
            return writer;
        };

        Required.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        Required.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.typeTest.Required();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.stringField = reader.string();
                    break;
                case 2:
                    message.int32Field = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("stringField"))
                throw $util.ProtocolError("missing required 'stringField'", { instance: message });
            if (!message.hasOwnProperty("int32Field"))
                throw $util.ProtocolError("missing required 'int32Field'", { instance: message });
            return message;
        };

        Required.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return Required;
    })();

    typeTest.EnumType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "EnumV0"] = 0;
        values[valuesById[1] = "EnumV1"] = 1;
        values[valuesById[2] = "EnumV2"] = 2;
        return values;
    })();

    typeTest.Typeful = (function() {

        function Typeful(properties) {
            this.repeatedStringField = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        Typeful.prototype.stringField = "";
        Typeful.prototype.int32Field = 0;
        Typeful.prototype.int64Field = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        Typeful.prototype.enumField = 0;
        Typeful.prototype.enumEField = 0;
        Typeful.prototype.basicField = null;
        Typeful.prototype.int32Value = null;
        Typeful.prototype.int64Value = null;
        Typeful.prototype.repeatedStringField = $util.emptyArray;

        let $oneOfFields;

        Object.defineProperty(Typeful.prototype, "valueField", {
            get: $util.oneOfGetter($oneOfFields = ["int32Value", "int64Value"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        Typeful.create = function create(properties) {
            return new Typeful(properties);
        };

        Typeful.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.stringField != null && Object.hasOwnProperty.call(message, "stringField"))
                writer.uint32(10).string(message.stringField);
            if (message.int32Field != null && Object.hasOwnProperty.call(message, "int32Field"))
                writer.uint32(16).int32(message.int32Field);
            if (message.int64Field != null && Object.hasOwnProperty.call(message, "int64Field"))
                writer.uint32(24).int64(message.int64Field);
            if (message.enumField != null && Object.hasOwnProperty.call(message, "enumField"))
                writer.uint32(32).int32(message.enumField);
            if (message.enumEField != null && Object.hasOwnProperty.call(message, "enumEField"))
                writer.uint32(40).int32(message.enumEField);
            if (message.basicField != null && Object.hasOwnProperty.call(message, "basicField"))
                $root.typeTest.Basic.encode(message.basicField, writer.uint32(50).fork()).ldelim();
            if (message.int32Value != null && Object.hasOwnProperty.call(message, "int32Value"))
                writer.uint32(56).int32(message.int32Value);
            if (message.int64Value != null && Object.hasOwnProperty.call(message, "int64Value"))
                writer.uint32(64).int64(message.int64Value);
            if (message.repeatedStringField != null && message.repeatedStringField.length)
                for (let i = 0; i < message.repeatedStringField.length; ++i)
                    writer.uint32(74).string(message.repeatedStringField[i]);
            return writer;
        };

        Typeful.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        Typeful.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.typeTest.Typeful();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.stringField = reader.string();
                    break;
                case 2:
                    message.int32Field = reader.int32();
                    break;
                case 3:
                    message.int64Field = reader.int64();
                    break;
                case 4:
                    message.enumField = reader.int32();
                    break;
                case 5:
                    message.enumEField = reader.int32();
                    break;
                case 6:
                    message.basicField = $root.typeTest.Basic.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.int32Value = reader.int32();
                    break;
                case 8:
                    message.int64Value = reader.int64();
                    break;
                case 9:
                    if (!(message.repeatedStringField && message.repeatedStringField.length))
                        message.repeatedStringField = [];
                    message.repeatedStringField.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        Typeful.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        Typeful.EnumTypeE = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "EnumVE0"] = 0;
            values[valuesById[1] = "EnumVE1"] = 1;
            values[valuesById[2] = "EnumVE2"] = 2;
            return values;
        })();

        return Typeful;
    })();

    return typeTest;
})();

export const typeTest3 = $root.typeTest3 = (() => {

    const typeTest3 = {};

    typeTest3.Basic = (function() {

        function Basic(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        Basic.prototype.stringField = null;
        Basic.prototype.int32Field = null;

        let $oneOfFields;

        Object.defineProperty(Basic.prototype, "_stringField", {
            get: $util.oneOfGetter($oneOfFields = ["stringField"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        Object.defineProperty(Basic.prototype, "_int32Field", {
            get: $util.oneOfGetter($oneOfFields = ["int32Field"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        Basic.create = function create(properties) {
            return new Basic(properties);
        };

        Basic.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.stringField != null && Object.hasOwnProperty.call(message, "stringField"))
                writer.uint32(10).string(message.stringField);
            if (message.int32Field != null && Object.hasOwnProperty.call(message, "int32Field"))
                writer.uint32(16).int32(message.int32Field);
            return writer;
        };

        Basic.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        Basic.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.typeTest3.Basic();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.stringField = reader.string();
                    break;
                case 2:
                    message.int32Field = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        Basic.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return Basic;
    })();

    typeTest3.Required = (function() {

        function Required(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        Required.prototype.stringField = "";
        Required.prototype.int32Field = 0;

        Required.create = function create(properties) {
            return new Required(properties);
        };

        Required.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.stringField != null && Object.hasOwnProperty.call(message, "stringField"))
                writer.uint32(10).string(message.stringField);
            if (message.int32Field != null && Object.hasOwnProperty.call(message, "int32Field"))
                writer.uint32(16).int32(message.int32Field);
            return writer;
        };

        Required.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        Required.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.typeTest3.Required();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.stringField = reader.string();
                    break;
                case 2:
                    message.int32Field = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        Required.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return Required;
    })();

    typeTest3.EnumType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "EnumV0"] = 0;
        values[valuesById[1] = "EnumV1"] = 1;
        values[valuesById[2] = "EnumV2"] = 2;
        return values;
    })();

    typeTest3.Typeful = (function() {

        function Typeful(properties) {
            this.repeatedStringField = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        Typeful.prototype.stringField = null;
        Typeful.prototype.int32Field = null;
        Typeful.prototype.int64Field = null;
        Typeful.prototype.enumField = null;
        Typeful.prototype.enumEField = null;
        Typeful.prototype.basicField = null;
        Typeful.prototype.int32Value = null;
        Typeful.prototype.int64Value = null;
        Typeful.prototype.repeatedStringField = $util.emptyArray;

        let $oneOfFields;

        Object.defineProperty(Typeful.prototype, "_stringField", {
            get: $util.oneOfGetter($oneOfFields = ["stringField"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        Object.defineProperty(Typeful.prototype, "_int32Field", {
            get: $util.oneOfGetter($oneOfFields = ["int32Field"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        Object.defineProperty(Typeful.prototype, "_int64Field", {
            get: $util.oneOfGetter($oneOfFields = ["int64Field"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        Object.defineProperty(Typeful.prototype, "_enumField", {
            get: $util.oneOfGetter($oneOfFields = ["enumField"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        Object.defineProperty(Typeful.prototype, "_enumEField", {
            get: $util.oneOfGetter($oneOfFields = ["enumEField"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        Object.defineProperty(Typeful.prototype, "_basicField", {
            get: $util.oneOfGetter($oneOfFields = ["basicField"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        Object.defineProperty(Typeful.prototype, "valueField", {
            get: $util.oneOfGetter($oneOfFields = ["int32Value", "int64Value"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        Typeful.create = function create(properties) {
            return new Typeful(properties);
        };

        Typeful.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.stringField != null && Object.hasOwnProperty.call(message, "stringField"))
                writer.uint32(10).string(message.stringField);
            if (message.int32Field != null && Object.hasOwnProperty.call(message, "int32Field"))
                writer.uint32(16).int32(message.int32Field);
            if (message.int64Field != null && Object.hasOwnProperty.call(message, "int64Field"))
                writer.uint32(24).int64(message.int64Field);
            if (message.enumField != null && Object.hasOwnProperty.call(message, "enumField"))
                writer.uint32(32).int32(message.enumField);
            if (message.enumEField != null && Object.hasOwnProperty.call(message, "enumEField"))
                writer.uint32(40).int32(message.enumEField);
            if (message.basicField != null && Object.hasOwnProperty.call(message, "basicField"))
                $root.typeTest3.Basic.encode(message.basicField, writer.uint32(50).fork()).ldelim();
            if (message.int32Value != null && Object.hasOwnProperty.call(message, "int32Value"))
                writer.uint32(56).int32(message.int32Value);
            if (message.int64Value != null && Object.hasOwnProperty.call(message, "int64Value"))
                writer.uint32(64).int64(message.int64Value);
            if (message.repeatedStringField != null && message.repeatedStringField.length)
                for (let i = 0; i < message.repeatedStringField.length; ++i)
                    writer.uint32(74).string(message.repeatedStringField[i]);
            return writer;
        };

        Typeful.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        Typeful.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.typeTest3.Typeful();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.stringField = reader.string();
                    break;
                case 2:
                    message.int32Field = reader.int32();
                    break;
                case 3:
                    message.int64Field = reader.int64();
                    break;
                case 4:
                    message.enumField = reader.int32();
                    break;
                case 5:
                    message.enumEField = reader.int32();
                    break;
                case 6:
                    message.basicField = $root.typeTest3.Basic.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.int32Value = reader.int32();
                    break;
                case 8:
                    message.int64Value = reader.int64();
                    break;
                case 9:
                    if (!(message.repeatedStringField && message.repeatedStringField.length))
                        message.repeatedStringField = [];
                    message.repeatedStringField.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        Typeful.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        Typeful.EnumTypeE = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "EnumVE0"] = 0;
            values[valuesById[1] = "EnumVE1"] = 1;
            values[valuesById[2] = "EnumVE2"] = 2;
            return values;
        })();

        return Typeful;
    })();

    return typeTest3;
})();

export { $root as default };
