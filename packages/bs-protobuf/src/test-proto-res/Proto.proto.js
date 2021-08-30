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

export const typeTest = $root.typeTest = (() => {

    /**
     * Namespace typeTest.
     * @exports typeTest
     * @namespace
     */
    const typeTest = {};

    typeTest.Basic = (function() {

        /**
         * Properties of a Basic.
         * @memberof typeTest
         * @interface IBasic
         * @property {string|null} [stringField] Basic stringField
         * @property {number|null} [int32Field] Basic int32Field
         */

        /**
         * Constructs a new Basic.
         * @memberof typeTest
         * @classdesc Represents a Basic.
         * @implements IBasic
         * @constructor
         * @param {typeTest.IBasic=} [properties] Properties to set
         */
        function Basic(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Basic stringField.
         * @member {string} stringField
         * @memberof typeTest.Basic
         * @instance
         */
        Basic.prototype.stringField = "";

        /**
         * Basic int32Field.
         * @member {number} int32Field
         * @memberof typeTest.Basic
         * @instance
         */
        Basic.prototype.int32Field = 0;

        /**
         * Creates a new Basic instance using the specified properties.
         * @function create
         * @memberof typeTest.Basic
         * @static
         * @param {typeTest.IBasic=} [properties] Properties to set
         * @returns {typeTest.Basic} Basic instance
         */
        Basic.create = function create(properties) {
            return new Basic(properties);
        };

        /**
         * Encodes the specified Basic message. Does not implicitly {@link typeTest.Basic.verify|verify} messages.
         * @function encode
         * @memberof typeTest.Basic
         * @static
         * @param {typeTest.IBasic} message Basic message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Basic.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.stringField != null && Object.hasOwnProperty.call(message, "stringField"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.stringField);
            if (message.int32Field != null && Object.hasOwnProperty.call(message, "int32Field"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.int32Field);
            return writer;
        };

        /**
         * Encodes the specified Basic message, length delimited. Does not implicitly {@link typeTest.Basic.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typeTest.Basic
         * @static
         * @param {typeTest.IBasic} message Basic message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Basic.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Basic message from the specified reader or buffer.
         * @function decode
         * @memberof typeTest.Basic
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typeTest.Basic} Basic
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
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

        /**
         * Decodes a Basic message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typeTest.Basic
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typeTest.Basic} Basic
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Basic.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return Basic;
    })();

    typeTest.Required = (function() {

        /**
         * Properties of a Required.
         * @memberof typeTest
         * @interface IRequired
         * @property {string} stringField Required stringField
         * @property {number} int32Field Required int32Field
         */

        /**
         * Constructs a new Required.
         * @memberof typeTest
         * @classdesc Represents a Required.
         * @implements IRequired
         * @constructor
         * @param {typeTest.IRequired=} [properties] Properties to set
         */
        function Required(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Required stringField.
         * @member {string} stringField
         * @memberof typeTest.Required
         * @instance
         */
        Required.prototype.stringField = "";

        /**
         * Required int32Field.
         * @member {number} int32Field
         * @memberof typeTest.Required
         * @instance
         */
        Required.prototype.int32Field = 0;

        /**
         * Creates a new Required instance using the specified properties.
         * @function create
         * @memberof typeTest.Required
         * @static
         * @param {typeTest.IRequired=} [properties] Properties to set
         * @returns {typeTest.Required} Required instance
         */
        Required.create = function create(properties) {
            return new Required(properties);
        };

        /**
         * Encodes the specified Required message. Does not implicitly {@link typeTest.Required.verify|verify} messages.
         * @function encode
         * @memberof typeTest.Required
         * @static
         * @param {typeTest.IRequired} message Required message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Required.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.stringField);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.int32Field);
            return writer;
        };

        /**
         * Encodes the specified Required message, length delimited. Does not implicitly {@link typeTest.Required.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typeTest.Required
         * @static
         * @param {typeTest.IRequired} message Required message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Required.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Required message from the specified reader or buffer.
         * @function decode
         * @memberof typeTest.Required
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typeTest.Required} Required
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
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

        /**
         * Decodes a Required message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typeTest.Required
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typeTest.Required} Required
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Required.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return Required;
    })();

    /**
     * EnumType enum.
     * @name typeTest.EnumType
     * @enum {number}
     * @property {number} EnumV0=0 EnumV0 value
     * @property {number} EnumV1=1 EnumV1 value
     * @property {number} EnumV2=2 EnumV2 value
     */
    typeTest.EnumType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "EnumV0"] = 0;
        values[valuesById[1] = "EnumV1"] = 1;
        values[valuesById[2] = "EnumV2"] = 2;
        return values;
    })();

    typeTest.Typeful = (function() {

        /**
         * Properties of a Typeful.
         * @memberof typeTest
         * @interface ITypeful
         * @property {string|null} [stringField] Typeful stringField
         * @property {number|null} [int32Field] Typeful int32Field
         * @property {number|Long|null} [int64Field] Typeful int64Field
         * @property {typeTest.EnumType|null} [enumField] Typeful enumField
         * @property {typeTest.Typeful.EnumTypeE|null} [enumEField] Typeful enumEField
         * @property {typeTest.IBasic|null} [basicField] Typeful basicField
         * @property {number|null} [int32Value] Typeful int32Value
         * @property {number|Long|null} [int64Value] Typeful int64Value
         * @property {Array.<string>|null} [repeatedStringField] Typeful repeatedStringField
         */

        /**
         * Constructs a new Typeful.
         * @memberof typeTest
         * @classdesc Represents a Typeful.
         * @implements ITypeful
         * @constructor
         * @param {typeTest.ITypeful=} [properties] Properties to set
         */
        function Typeful(properties) {
            this.repeatedStringField = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Typeful stringField.
         * @member {string} stringField
         * @memberof typeTest.Typeful
         * @instance
         */
        Typeful.prototype.stringField = "";

        /**
         * Typeful int32Field.
         * @member {number} int32Field
         * @memberof typeTest.Typeful
         * @instance
         */
        Typeful.prototype.int32Field = 0;

        /**
         * Typeful int64Field.
         * @member {number|Long} int64Field
         * @memberof typeTest.Typeful
         * @instance
         */
        Typeful.prototype.int64Field = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Typeful enumField.
         * @member {typeTest.EnumType} enumField
         * @memberof typeTest.Typeful
         * @instance
         */
        Typeful.prototype.enumField = 0;

        /**
         * Typeful enumEField.
         * @member {typeTest.Typeful.EnumTypeE} enumEField
         * @memberof typeTest.Typeful
         * @instance
         */
        Typeful.prototype.enumEField = 0;

        /**
         * Typeful basicField.
         * @member {typeTest.IBasic|null|undefined} basicField
         * @memberof typeTest.Typeful
         * @instance
         */
        Typeful.prototype.basicField = null;

        /**
         * Typeful int32Value.
         * @member {number|null|undefined} int32Value
         * @memberof typeTest.Typeful
         * @instance
         */
        Typeful.prototype.int32Value = null;

        /**
         * Typeful int64Value.
         * @member {number|Long|null|undefined} int64Value
         * @memberof typeTest.Typeful
         * @instance
         */
        Typeful.prototype.int64Value = null;

        /**
         * Typeful repeatedStringField.
         * @member {Array.<string>} repeatedStringField
         * @memberof typeTest.Typeful
         * @instance
         */
        Typeful.prototype.repeatedStringField = $util.emptyArray;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * Typeful valueField.
         * @member {"int32Value"|"int64Value"|undefined} valueField
         * @memberof typeTest.Typeful
         * @instance
         */
        Object.defineProperty(Typeful.prototype, "valueField", {
            get: $util.oneOfGetter($oneOfFields = ["int32Value", "int64Value"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Typeful instance using the specified properties.
         * @function create
         * @memberof typeTest.Typeful
         * @static
         * @param {typeTest.ITypeful=} [properties] Properties to set
         * @returns {typeTest.Typeful} Typeful instance
         */
        Typeful.create = function create(properties) {
            return new Typeful(properties);
        };

        /**
         * Encodes the specified Typeful message. Does not implicitly {@link typeTest.Typeful.verify|verify} messages.
         * @function encode
         * @memberof typeTest.Typeful
         * @static
         * @param {typeTest.ITypeful} message Typeful message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Typeful.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.stringField != null && Object.hasOwnProperty.call(message, "stringField"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.stringField);
            if (message.int32Field != null && Object.hasOwnProperty.call(message, "int32Field"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.int32Field);
            if (message.int64Field != null && Object.hasOwnProperty.call(message, "int64Field"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.int64Field);
            if (message.enumField != null && Object.hasOwnProperty.call(message, "enumField"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.enumField);
            if (message.enumEField != null && Object.hasOwnProperty.call(message, "enumEField"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.enumEField);
            if (message.basicField != null && Object.hasOwnProperty.call(message, "basicField"))
                $root.typeTest.Basic.encode(message.basicField, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.int32Value != null && Object.hasOwnProperty.call(message, "int32Value"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.int32Value);
            if (message.int64Value != null && Object.hasOwnProperty.call(message, "int64Value"))
                writer.uint32(/* id 8, wireType 0 =*/64).int64(message.int64Value);
            if (message.repeatedStringField != null && message.repeatedStringField.length)
                for (let i = 0; i < message.repeatedStringField.length; ++i)
                    writer.uint32(/* id 9, wireType 2 =*/74).string(message.repeatedStringField[i]);
            return writer;
        };

        /**
         * Encodes the specified Typeful message, length delimited. Does not implicitly {@link typeTest.Typeful.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typeTest.Typeful
         * @static
         * @param {typeTest.ITypeful} message Typeful message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Typeful.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Typeful message from the specified reader or buffer.
         * @function decode
         * @memberof typeTest.Typeful
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typeTest.Typeful} Typeful
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
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

        /**
         * Decodes a Typeful message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typeTest.Typeful
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typeTest.Typeful} Typeful
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Typeful.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * EnumTypeE enum.
         * @name typeTest.Typeful.EnumTypeE
         * @enum {number}
         * @property {number} EnumVE0=0 EnumVE0 value
         * @property {number} EnumVE1=1 EnumVE1 value
         * @property {number} EnumVE2=2 EnumVE2 value
         */
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

    /**
     * Namespace typeTest3.
     * @exports typeTest3
     * @namespace
     */
    const typeTest3 = {};

    typeTest3.Basic = (function() {

        /**
         * Properties of a Basic.
         * @memberof typeTest3
         * @interface IBasic
         * @property {string|null} [stringField] Basic stringField
         * @property {number|null} [int32Field] Basic int32Field
         */

        /**
         * Constructs a new Basic.
         * @memberof typeTest3
         * @classdesc Represents a Basic.
         * @implements IBasic
         * @constructor
         * @param {typeTest3.IBasic=} [properties] Properties to set
         */
        function Basic(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Basic stringField.
         * @member {string|null|undefined} stringField
         * @memberof typeTest3.Basic
         * @instance
         */
        Basic.prototype.stringField = null;

        /**
         * Basic int32Field.
         * @member {number|null|undefined} int32Field
         * @memberof typeTest3.Basic
         * @instance
         */
        Basic.prototype.int32Field = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * Basic _stringField.
         * @member {"stringField"|undefined} _stringField
         * @memberof typeTest3.Basic
         * @instance
         */
        Object.defineProperty(Basic.prototype, "_stringField", {
            get: $util.oneOfGetter($oneOfFields = ["stringField"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Basic _int32Field.
         * @member {"int32Field"|undefined} _int32Field
         * @memberof typeTest3.Basic
         * @instance
         */
        Object.defineProperty(Basic.prototype, "_int32Field", {
            get: $util.oneOfGetter($oneOfFields = ["int32Field"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Basic instance using the specified properties.
         * @function create
         * @memberof typeTest3.Basic
         * @static
         * @param {typeTest3.IBasic=} [properties] Properties to set
         * @returns {typeTest3.Basic} Basic instance
         */
        Basic.create = function create(properties) {
            return new Basic(properties);
        };

        /**
         * Encodes the specified Basic message. Does not implicitly {@link typeTest3.Basic.verify|verify} messages.
         * @function encode
         * @memberof typeTest3.Basic
         * @static
         * @param {typeTest3.IBasic} message Basic message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Basic.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.stringField != null && Object.hasOwnProperty.call(message, "stringField"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.stringField);
            if (message.int32Field != null && Object.hasOwnProperty.call(message, "int32Field"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.int32Field);
            return writer;
        };

        /**
         * Encodes the specified Basic message, length delimited. Does not implicitly {@link typeTest3.Basic.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typeTest3.Basic
         * @static
         * @param {typeTest3.IBasic} message Basic message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Basic.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Basic message from the specified reader or buffer.
         * @function decode
         * @memberof typeTest3.Basic
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typeTest3.Basic} Basic
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
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

        /**
         * Decodes a Basic message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typeTest3.Basic
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typeTest3.Basic} Basic
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Basic.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return Basic;
    })();

    typeTest3.Required = (function() {

        /**
         * Properties of a Required.
         * @memberof typeTest3
         * @interface IRequired
         * @property {string|null} [stringField] Required stringField
         * @property {number|null} [int32Field] Required int32Field
         */

        /**
         * Constructs a new Required.
         * @memberof typeTest3
         * @classdesc Represents a Required.
         * @implements IRequired
         * @constructor
         * @param {typeTest3.IRequired=} [properties] Properties to set
         */
        function Required(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Required stringField.
         * @member {string} stringField
         * @memberof typeTest3.Required
         * @instance
         */
        Required.prototype.stringField = "";

        /**
         * Required int32Field.
         * @member {number} int32Field
         * @memberof typeTest3.Required
         * @instance
         */
        Required.prototype.int32Field = 0;

        /**
         * Creates a new Required instance using the specified properties.
         * @function create
         * @memberof typeTest3.Required
         * @static
         * @param {typeTest3.IRequired=} [properties] Properties to set
         * @returns {typeTest3.Required} Required instance
         */
        Required.create = function create(properties) {
            return new Required(properties);
        };

        /**
         * Encodes the specified Required message. Does not implicitly {@link typeTest3.Required.verify|verify} messages.
         * @function encode
         * @memberof typeTest3.Required
         * @static
         * @param {typeTest3.IRequired} message Required message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Required.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.stringField != null && Object.hasOwnProperty.call(message, "stringField"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.stringField);
            if (message.int32Field != null && Object.hasOwnProperty.call(message, "int32Field"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.int32Field);
            return writer;
        };

        /**
         * Encodes the specified Required message, length delimited. Does not implicitly {@link typeTest3.Required.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typeTest3.Required
         * @static
         * @param {typeTest3.IRequired} message Required message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Required.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Required message from the specified reader or buffer.
         * @function decode
         * @memberof typeTest3.Required
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typeTest3.Required} Required
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
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

        /**
         * Decodes a Required message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typeTest3.Required
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typeTest3.Required} Required
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Required.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return Required;
    })();

    /**
     * EnumType enum.
     * @name typeTest3.EnumType
     * @enum {number}
     * @property {number} EnumV0=0 EnumV0 value
     * @property {number} EnumV1=1 EnumV1 value
     * @property {number} EnumV2=2 EnumV2 value
     */
    typeTest3.EnumType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "EnumV0"] = 0;
        values[valuesById[1] = "EnumV1"] = 1;
        values[valuesById[2] = "EnumV2"] = 2;
        return values;
    })();

    typeTest3.Typeful = (function() {

        /**
         * Properties of a Typeful.
         * @memberof typeTest3
         * @interface ITypeful
         * @property {string|null} [stringField] Typeful stringField
         * @property {number|null} [int32Field] Typeful int32Field
         * @property {number|Long|null} [int64Field] Typeful int64Field
         * @property {typeTest3.EnumType|null} [enumField] Typeful enumField
         * @property {typeTest3.Typeful.EnumTypeE|null} [enumEField] Typeful enumEField
         * @property {typeTest3.IBasic|null} [basicField] Typeful basicField
         * @property {number|null} [int32Value] Typeful int32Value
         * @property {number|Long|null} [int64Value] Typeful int64Value
         * @property {Array.<string>|null} [repeatedStringField] Typeful repeatedStringField
         */

        /**
         * Constructs a new Typeful.
         * @memberof typeTest3
         * @classdesc Represents a Typeful.
         * @implements ITypeful
         * @constructor
         * @param {typeTest3.ITypeful=} [properties] Properties to set
         */
        function Typeful(properties) {
            this.repeatedStringField = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Typeful stringField.
         * @member {string|null|undefined} stringField
         * @memberof typeTest3.Typeful
         * @instance
         */
        Typeful.prototype.stringField = null;

        /**
         * Typeful int32Field.
         * @member {number|null|undefined} int32Field
         * @memberof typeTest3.Typeful
         * @instance
         */
        Typeful.prototype.int32Field = null;

        /**
         * Typeful int64Field.
         * @member {number|Long|null|undefined} int64Field
         * @memberof typeTest3.Typeful
         * @instance
         */
        Typeful.prototype.int64Field = null;

        /**
         * Typeful enumField.
         * @member {typeTest3.EnumType|null|undefined} enumField
         * @memberof typeTest3.Typeful
         * @instance
         */
        Typeful.prototype.enumField = null;

        /**
         * Typeful enumEField.
         * @member {typeTest3.Typeful.EnumTypeE|null|undefined} enumEField
         * @memberof typeTest3.Typeful
         * @instance
         */
        Typeful.prototype.enumEField = null;

        /**
         * Typeful basicField.
         * @member {typeTest3.IBasic|null|undefined} basicField
         * @memberof typeTest3.Typeful
         * @instance
         */
        Typeful.prototype.basicField = null;

        /**
         * Typeful int32Value.
         * @member {number|null|undefined} int32Value
         * @memberof typeTest3.Typeful
         * @instance
         */
        Typeful.prototype.int32Value = null;

        /**
         * Typeful int64Value.
         * @member {number|Long|null|undefined} int64Value
         * @memberof typeTest3.Typeful
         * @instance
         */
        Typeful.prototype.int64Value = null;

        /**
         * Typeful repeatedStringField.
         * @member {Array.<string>} repeatedStringField
         * @memberof typeTest3.Typeful
         * @instance
         */
        Typeful.prototype.repeatedStringField = $util.emptyArray;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * Typeful _stringField.
         * @member {"stringField"|undefined} _stringField
         * @memberof typeTest3.Typeful
         * @instance
         */
        Object.defineProperty(Typeful.prototype, "_stringField", {
            get: $util.oneOfGetter($oneOfFields = ["stringField"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Typeful _int32Field.
         * @member {"int32Field"|undefined} _int32Field
         * @memberof typeTest3.Typeful
         * @instance
         */
        Object.defineProperty(Typeful.prototype, "_int32Field", {
            get: $util.oneOfGetter($oneOfFields = ["int32Field"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Typeful _int64Field.
         * @member {"int64Field"|undefined} _int64Field
         * @memberof typeTest3.Typeful
         * @instance
         */
        Object.defineProperty(Typeful.prototype, "_int64Field", {
            get: $util.oneOfGetter($oneOfFields = ["int64Field"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Typeful _enumField.
         * @member {"enumField"|undefined} _enumField
         * @memberof typeTest3.Typeful
         * @instance
         */
        Object.defineProperty(Typeful.prototype, "_enumField", {
            get: $util.oneOfGetter($oneOfFields = ["enumField"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Typeful _enumEField.
         * @member {"enumEField"|undefined} _enumEField
         * @memberof typeTest3.Typeful
         * @instance
         */
        Object.defineProperty(Typeful.prototype, "_enumEField", {
            get: $util.oneOfGetter($oneOfFields = ["enumEField"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Typeful _basicField.
         * @member {"basicField"|undefined} _basicField
         * @memberof typeTest3.Typeful
         * @instance
         */
        Object.defineProperty(Typeful.prototype, "_basicField", {
            get: $util.oneOfGetter($oneOfFields = ["basicField"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Typeful valueField.
         * @member {"int32Value"|"int64Value"|undefined} valueField
         * @memberof typeTest3.Typeful
         * @instance
         */
        Object.defineProperty(Typeful.prototype, "valueField", {
            get: $util.oneOfGetter($oneOfFields = ["int32Value", "int64Value"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Typeful instance using the specified properties.
         * @function create
         * @memberof typeTest3.Typeful
         * @static
         * @param {typeTest3.ITypeful=} [properties] Properties to set
         * @returns {typeTest3.Typeful} Typeful instance
         */
        Typeful.create = function create(properties) {
            return new Typeful(properties);
        };

        /**
         * Encodes the specified Typeful message. Does not implicitly {@link typeTest3.Typeful.verify|verify} messages.
         * @function encode
         * @memberof typeTest3.Typeful
         * @static
         * @param {typeTest3.ITypeful} message Typeful message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Typeful.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.stringField != null && Object.hasOwnProperty.call(message, "stringField"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.stringField);
            if (message.int32Field != null && Object.hasOwnProperty.call(message, "int32Field"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.int32Field);
            if (message.int64Field != null && Object.hasOwnProperty.call(message, "int64Field"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.int64Field);
            if (message.enumField != null && Object.hasOwnProperty.call(message, "enumField"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.enumField);
            if (message.enumEField != null && Object.hasOwnProperty.call(message, "enumEField"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.enumEField);
            if (message.basicField != null && Object.hasOwnProperty.call(message, "basicField"))
                $root.typeTest3.Basic.encode(message.basicField, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.int32Value != null && Object.hasOwnProperty.call(message, "int32Value"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.int32Value);
            if (message.int64Value != null && Object.hasOwnProperty.call(message, "int64Value"))
                writer.uint32(/* id 8, wireType 0 =*/64).int64(message.int64Value);
            if (message.repeatedStringField != null && message.repeatedStringField.length)
                for (let i = 0; i < message.repeatedStringField.length; ++i)
                    writer.uint32(/* id 9, wireType 2 =*/74).string(message.repeatedStringField[i]);
            return writer;
        };

        /**
         * Encodes the specified Typeful message, length delimited. Does not implicitly {@link typeTest3.Typeful.verify|verify} messages.
         * @function encodeDelimited
         * @memberof typeTest3.Typeful
         * @static
         * @param {typeTest3.ITypeful} message Typeful message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Typeful.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Typeful message from the specified reader or buffer.
         * @function decode
         * @memberof typeTest3.Typeful
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {typeTest3.Typeful} Typeful
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
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

        /**
         * Decodes a Typeful message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof typeTest3.Typeful
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {typeTest3.Typeful} Typeful
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Typeful.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * EnumTypeE enum.
         * @name typeTest3.Typeful.EnumTypeE
         * @enum {number}
         * @property {number} EnumVE0=0 EnumVE0 value
         * @property {number} EnumVE1=1 EnumVE1 value
         * @property {number} EnumVE2=2 EnumVE2 value
         */
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
