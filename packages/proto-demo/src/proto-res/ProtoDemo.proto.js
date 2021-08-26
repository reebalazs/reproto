/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const services = $root.services = (() => {

    /**
     * Namespace services.
     * @exports services
     * @namespace
     */
    const services = {};

    services.HelloWorldRequest = (function() {

        /**
         * Properties of a HelloWorldRequest.
         * @memberof services
         * @interface IHelloWorldRequest
         * @property {string|null} [world] HelloWorldRequest world
         */

        /**
         * Constructs a new HelloWorldRequest.
         * @memberof services
         * @classdesc Represents a HelloWorldRequest.
         * @implements IHelloWorldRequest
         * @constructor
         * @param {services.IHelloWorldRequest=} [properties] Properties to set
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
         * @memberof services.HelloWorldRequest
         * @instance
         */
        HelloWorldRequest.prototype.world = "";

        /**
         * Creates a new HelloWorldRequest instance using the specified properties.
         * @function create
         * @memberof services.HelloWorldRequest
         * @static
         * @param {services.IHelloWorldRequest=} [properties] Properties to set
         * @returns {services.HelloWorldRequest} HelloWorldRequest instance
         */
        HelloWorldRequest.create = function create(properties) {
            return new HelloWorldRequest(properties);
        };

        /**
         * Encodes the specified HelloWorldRequest message. Does not implicitly {@link services.HelloWorldRequest.verify|verify} messages.
         * @function encode
         * @memberof services.HelloWorldRequest
         * @static
         * @param {services.IHelloWorldRequest} message HelloWorldRequest message or plain object to encode
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
         * Encodes the specified HelloWorldRequest message, length delimited. Does not implicitly {@link services.HelloWorldRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof services.HelloWorldRequest
         * @static
         * @param {services.IHelloWorldRequest} message HelloWorldRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloWorldRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HelloWorldRequest message from the specified reader or buffer.
         * @function decode
         * @memberof services.HelloWorldRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {services.HelloWorldRequest} HelloWorldRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HelloWorldRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.services.HelloWorldRequest();
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
         * @memberof services.HelloWorldRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {services.HelloWorldRequest} HelloWorldRequest
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

    services.HelloWorldResponse = (function() {

        /**
         * Properties of a HelloWorldResponse.
         * @memberof services
         * @interface IHelloWorldResponse
         * @property {string|null} [world] HelloWorldResponse world
         */

        /**
         * Constructs a new HelloWorldResponse.
         * @memberof services
         * @classdesc Represents a HelloWorldResponse.
         * @implements IHelloWorldResponse
         * @constructor
         * @param {services.IHelloWorldResponse=} [properties] Properties to set
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
         * @memberof services.HelloWorldResponse
         * @instance
         */
        HelloWorldResponse.prototype.world = "";

        /**
         * Creates a new HelloWorldResponse instance using the specified properties.
         * @function create
         * @memberof services.HelloWorldResponse
         * @static
         * @param {services.IHelloWorldResponse=} [properties] Properties to set
         * @returns {services.HelloWorldResponse} HelloWorldResponse instance
         */
        HelloWorldResponse.create = function create(properties) {
            return new HelloWorldResponse(properties);
        };

        /**
         * Encodes the specified HelloWorldResponse message. Does not implicitly {@link services.HelloWorldResponse.verify|verify} messages.
         * @function encode
         * @memberof services.HelloWorldResponse
         * @static
         * @param {services.IHelloWorldResponse} message HelloWorldResponse message or plain object to encode
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
         * Encodes the specified HelloWorldResponse message, length delimited. Does not implicitly {@link services.HelloWorldResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof services.HelloWorldResponse
         * @static
         * @param {services.IHelloWorldResponse} message HelloWorldResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloWorldResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HelloWorldResponse message from the specified reader or buffer.
         * @function decode
         * @memberof services.HelloWorldResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {services.HelloWorldResponse} HelloWorldResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HelloWorldResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.services.HelloWorldResponse();
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
         * @memberof services.HelloWorldResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {services.HelloWorldResponse} HelloWorldResponse
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

    services.HelloService = (function() {

        /**
         * Constructs a new HelloService service.
         * @memberof services
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
         * @memberof services.HelloService
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
         * Callback as used by {@link services.HelloService#world}.
         * @memberof services.HelloService
         * @typedef WorldCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {services.HelloWorldResponse} [response] HelloWorldResponse
         */

        /**
         * Calls World.
         * @function world
         * @memberof services.HelloService
         * @instance
         * @param {services.IHelloWorldRequest} request HelloWorldRequest message or plain object
         * @param {services.HelloService.WorldCallback} callback Node-style callback called with the error, if any, and HelloWorldResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(HelloService.prototype.world = function world(request, callback) {
            return this.rpcCall(world, $root.services.HelloWorldRequest, $root.services.HelloWorldResponse, request, callback);
        }, "name", { value: "World" });

        /**
         * Calls World.
         * @function world
         * @memberof services.HelloService
         * @instance
         * @param {services.IHelloWorldRequest} request HelloWorldRequest message or plain object
         * @returns {Promise<services.HelloWorldResponse>} Promise
         * @variation 2
         */

        return HelloService;
    })();

    return services;
})();

export { $root as default };
