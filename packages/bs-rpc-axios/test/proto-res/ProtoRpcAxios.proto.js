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

        HelloWorldRequest.prototype.world = null;

        let $oneOfFields;

        Object.defineProperty(HelloWorldRequest.prototype, "_world", {
            get: $util.oneOfGetter($oneOfFields = ["world"]),
            set: $util.oneOfSetter($oneOfFields)
        });

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

        HelloWorldResponse.prototype.world = null;

        let $oneOfFields;

        Object.defineProperty(HelloWorldResponse.prototype, "_world", {
            get: $util.oneOfGetter($oneOfFields = ["world"]),
            set: $util.oneOfSetter($oneOfFields)
        });

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

export { $root as default };
