/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const serviceTest = $root.serviceTest = (() => {

    /**
     * Namespace serviceTest.
     * @exports serviceTest
     * @namespace
     */
    const serviceTest = {};

    serviceTest.HelloWorldRequest = (function() {

        /**
         * Properties of a HelloWorldRequest.
         * @memberof serviceTest
         * @interface IHelloWorldRequest
         * @property {string|null} [world] HelloWorldRequest world
         */

        /**
         * Constructs a new HelloWorldRequest.
         * @memberof serviceTest
         * @classdesc Represents a HelloWorldRequest.
         * @implements IHelloWorldRequest
         * @constructor
         * @param {serviceTest.IHelloWorldRequest=} [properties] Properties to set
         */
        function HelloWorldRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HelloWorldRequest world.
         * @member {string} world
         * @memberof serviceTest.HelloWorldRequest
         * @instance
         */
        HelloWorldRequest.prototype.world = "";

        /**
         * Creates a new HelloWorldRequest instance using the specified properties.
         * @function create
         * @memberof serviceTest.HelloWorldRequest
         * @static
         * @param {serviceTest.IHelloWorldRequest=} [properties] Properties to set
         * @returns {serviceTest.HelloWorldRequest} HelloWorldRequest instance
         */
        HelloWorldRequest.create = function create(properties) {
            return new HelloWorldRequest(properties);
        };

        /**
         * Encodes the specified HelloWorldRequest message. Does not implicitly {@link serviceTest.HelloWorldRequest.verify|verify} messages.
         * @function encode
         * @memberof serviceTest.HelloWorldRequest
         * @static
         * @param {serviceTest.IHelloWorldRequest} message HelloWorldRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloWorldRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.world != null && Object.hasOwnProperty.call(message, "world"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.world);
            return writer;
        };

        /**
         * Encodes the specified HelloWorldRequest message, length delimited. Does not implicitly {@link serviceTest.HelloWorldRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof serviceTest.HelloWorldRequest
         * @static
         * @param {serviceTest.IHelloWorldRequest} message HelloWorldRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloWorldRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HelloWorldRequest message from the specified reader or buffer.
         * @function decode
         * @memberof serviceTest.HelloWorldRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {serviceTest.HelloWorldRequest} HelloWorldRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
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

        /**
         * Decodes a HelloWorldRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof serviceTest.HelloWorldRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {serviceTest.HelloWorldRequest} HelloWorldRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HelloWorldRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return HelloWorldRequest;
    })();

    serviceTest.HelloWorldResponse = (function() {

        /**
         * Properties of a HelloWorldResponse.
         * @memberof serviceTest
         * @interface IHelloWorldResponse
         * @property {string|null} [world] HelloWorldResponse world
         */

        /**
         * Constructs a new HelloWorldResponse.
         * @memberof serviceTest
         * @classdesc Represents a HelloWorldResponse.
         * @implements IHelloWorldResponse
         * @constructor
         * @param {serviceTest.IHelloWorldResponse=} [properties] Properties to set
         */
        function HelloWorldResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HelloWorldResponse world.
         * @member {string} world
         * @memberof serviceTest.HelloWorldResponse
         * @instance
         */
        HelloWorldResponse.prototype.world = "";

        /**
         * Creates a new HelloWorldResponse instance using the specified properties.
         * @function create
         * @memberof serviceTest.HelloWorldResponse
         * @static
         * @param {serviceTest.IHelloWorldResponse=} [properties] Properties to set
         * @returns {serviceTest.HelloWorldResponse} HelloWorldResponse instance
         */
        HelloWorldResponse.create = function create(properties) {
            return new HelloWorldResponse(properties);
        };

        /**
         * Encodes the specified HelloWorldResponse message. Does not implicitly {@link serviceTest.HelloWorldResponse.verify|verify} messages.
         * @function encode
         * @memberof serviceTest.HelloWorldResponse
         * @static
         * @param {serviceTest.IHelloWorldResponse} message HelloWorldResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloWorldResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.world != null && Object.hasOwnProperty.call(message, "world"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.world);
            return writer;
        };

        /**
         * Encodes the specified HelloWorldResponse message, length delimited. Does not implicitly {@link serviceTest.HelloWorldResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof serviceTest.HelloWorldResponse
         * @static
         * @param {serviceTest.IHelloWorldResponse} message HelloWorldResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloWorldResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HelloWorldResponse message from the specified reader or buffer.
         * @function decode
         * @memberof serviceTest.HelloWorldResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {serviceTest.HelloWorldResponse} HelloWorldResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
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

        /**
         * Decodes a HelloWorldResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof serviceTest.HelloWorldResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {serviceTest.HelloWorldResponse} HelloWorldResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HelloWorldResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return HelloWorldResponse;
    })();

    serviceTest.HelloService = (function() {

        /**
         * Constructs a new HelloService service.
         * @memberof serviceTest
         * @classdesc Represents a HelloService
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function HelloService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (HelloService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = HelloService;

        /**
         * Creates new HelloService service using the specified rpc implementation.
         * @function create
         * @memberof serviceTest.HelloService
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {HelloService} RPC service. Useful where requests and/or responses are streamed.
         */
        HelloService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link serviceTest.HelloService#world}.
         * @memberof serviceTest.HelloService
         * @typedef WorldCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {serviceTest.HelloWorldResponse} [response] HelloWorldResponse
         */

        /**
         * Calls World.
         * @function world
         * @memberof serviceTest.HelloService
         * @instance
         * @param {serviceTest.IHelloWorldRequest} request HelloWorldRequest message or plain object
         * @param {serviceTest.HelloService.WorldCallback} callback Node-style callback called with the error, if any, and HelloWorldResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(HelloService.prototype.world = function world(request, callback) {
            return this.rpcCall(world, $root.serviceTest.HelloWorldRequest, $root.serviceTest.HelloWorldResponse, request, callback);
        }, "name", { value: "World" });

        /**
         * Calls World.
         * @function world
         * @memberof serviceTest.HelloService
         * @instance
         * @param {serviceTest.IHelloWorldRequest} request HelloWorldRequest message or plain object
         * @returns {Promise<serviceTest.HelloWorldResponse>} Promise
         * @variation 2
         */

        return HelloService;
    })();

    return serviceTest;
})();

export const serviceTest3 = $root.serviceTest3 = (() => {

    /**
     * Namespace serviceTest3.
     * @exports serviceTest3
     * @namespace
     */
    const serviceTest3 = {};

    serviceTest3.HelloWorldRequest = (function() {

        /**
         * Properties of a HelloWorldRequest.
         * @memberof serviceTest3
         * @interface IHelloWorldRequest
         * @property {string|null} [world] HelloWorldRequest world
         */

        /**
         * Constructs a new HelloWorldRequest.
         * @memberof serviceTest3
         * @classdesc Represents a HelloWorldRequest.
         * @implements IHelloWorldRequest
         * @constructor
         * @param {serviceTest3.IHelloWorldRequest=} [properties] Properties to set
         */
        function HelloWorldRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HelloWorldRequest world.
         * @member {string|null|undefined} world
         * @memberof serviceTest3.HelloWorldRequest
         * @instance
         */
        HelloWorldRequest.prototype.world = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * HelloWorldRequest _world.
         * @member {"world"|undefined} _world
         * @memberof serviceTest3.HelloWorldRequest
         * @instance
         */
        Object.defineProperty(HelloWorldRequest.prototype, "_world", {
            get: $util.oneOfGetter($oneOfFields = ["world"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new HelloWorldRequest instance using the specified properties.
         * @function create
         * @memberof serviceTest3.HelloWorldRequest
         * @static
         * @param {serviceTest3.IHelloWorldRequest=} [properties] Properties to set
         * @returns {serviceTest3.HelloWorldRequest} HelloWorldRequest instance
         */
        HelloWorldRequest.create = function create(properties) {
            return new HelloWorldRequest(properties);
        };

        /**
         * Encodes the specified HelloWorldRequest message. Does not implicitly {@link serviceTest3.HelloWorldRequest.verify|verify} messages.
         * @function encode
         * @memberof serviceTest3.HelloWorldRequest
         * @static
         * @param {serviceTest3.IHelloWorldRequest} message HelloWorldRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloWorldRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.world != null && Object.hasOwnProperty.call(message, "world"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.world);
            return writer;
        };

        /**
         * Encodes the specified HelloWorldRequest message, length delimited. Does not implicitly {@link serviceTest3.HelloWorldRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof serviceTest3.HelloWorldRequest
         * @static
         * @param {serviceTest3.IHelloWorldRequest} message HelloWorldRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloWorldRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HelloWorldRequest message from the specified reader or buffer.
         * @function decode
         * @memberof serviceTest3.HelloWorldRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {serviceTest3.HelloWorldRequest} HelloWorldRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
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

        /**
         * Decodes a HelloWorldRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof serviceTest3.HelloWorldRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {serviceTest3.HelloWorldRequest} HelloWorldRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HelloWorldRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return HelloWorldRequest;
    })();

    serviceTest3.HelloWorldResponse = (function() {

        /**
         * Properties of a HelloWorldResponse.
         * @memberof serviceTest3
         * @interface IHelloWorldResponse
         * @property {string|null} [world] HelloWorldResponse world
         */

        /**
         * Constructs a new HelloWorldResponse.
         * @memberof serviceTest3
         * @classdesc Represents a HelloWorldResponse.
         * @implements IHelloWorldResponse
         * @constructor
         * @param {serviceTest3.IHelloWorldResponse=} [properties] Properties to set
         */
        function HelloWorldResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HelloWorldResponse world.
         * @member {string|null|undefined} world
         * @memberof serviceTest3.HelloWorldResponse
         * @instance
         */
        HelloWorldResponse.prototype.world = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * HelloWorldResponse _world.
         * @member {"world"|undefined} _world
         * @memberof serviceTest3.HelloWorldResponse
         * @instance
         */
        Object.defineProperty(HelloWorldResponse.prototype, "_world", {
            get: $util.oneOfGetter($oneOfFields = ["world"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new HelloWorldResponse instance using the specified properties.
         * @function create
         * @memberof serviceTest3.HelloWorldResponse
         * @static
         * @param {serviceTest3.IHelloWorldResponse=} [properties] Properties to set
         * @returns {serviceTest3.HelloWorldResponse} HelloWorldResponse instance
         */
        HelloWorldResponse.create = function create(properties) {
            return new HelloWorldResponse(properties);
        };

        /**
         * Encodes the specified HelloWorldResponse message. Does not implicitly {@link serviceTest3.HelloWorldResponse.verify|verify} messages.
         * @function encode
         * @memberof serviceTest3.HelloWorldResponse
         * @static
         * @param {serviceTest3.IHelloWorldResponse} message HelloWorldResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloWorldResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.world != null && Object.hasOwnProperty.call(message, "world"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.world);
            return writer;
        };

        /**
         * Encodes the specified HelloWorldResponse message, length delimited. Does not implicitly {@link serviceTest3.HelloWorldResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof serviceTest3.HelloWorldResponse
         * @static
         * @param {serviceTest3.IHelloWorldResponse} message HelloWorldResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloWorldResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HelloWorldResponse message from the specified reader or buffer.
         * @function decode
         * @memberof serviceTest3.HelloWorldResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {serviceTest3.HelloWorldResponse} HelloWorldResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
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

        /**
         * Decodes a HelloWorldResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof serviceTest3.HelloWorldResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {serviceTest3.HelloWorldResponse} HelloWorldResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HelloWorldResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return HelloWorldResponse;
    })();

    serviceTest3.HelloService = (function() {

        /**
         * Constructs a new HelloService service.
         * @memberof serviceTest3
         * @classdesc Represents a HelloService
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function HelloService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (HelloService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = HelloService;

        /**
         * Creates new HelloService service using the specified rpc implementation.
         * @function create
         * @memberof serviceTest3.HelloService
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {HelloService} RPC service. Useful where requests and/or responses are streamed.
         */
        HelloService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link serviceTest3.HelloService#world}.
         * @memberof serviceTest3.HelloService
         * @typedef WorldCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {serviceTest3.HelloWorldResponse} [response] HelloWorldResponse
         */

        /**
         * Calls World.
         * @function world
         * @memberof serviceTest3.HelloService
         * @instance
         * @param {serviceTest3.IHelloWorldRequest} request HelloWorldRequest message or plain object
         * @param {serviceTest3.HelloService.WorldCallback} callback Node-style callback called with the error, if any, and HelloWorldResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(HelloService.prototype.world = function world(request, callback) {
            return this.rpcCall(world, $root.serviceTest3.HelloWorldRequest, $root.serviceTest3.HelloWorldResponse, request, callback);
        }, "name", { value: "World" });

        /**
         * Calls World.
         * @function world
         * @memberof serviceTest3.HelloService
         * @instance
         * @param {serviceTest3.IHelloWorldRequest} request HelloWorldRequest message or plain object
         * @returns {Promise<serviceTest3.HelloWorldResponse>} Promise
         * @variation 2
         */

        return HelloService;
    })();

    return serviceTest3;
})();

export { $root as default };
