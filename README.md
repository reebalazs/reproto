# Reproto - Protocol Buffer support for Rescript

## Scope

Protocol Buffer support for Rescript. Provides auto-generated types
for protobuf message encoding and decoding, as well as support for
services.

Uses protobufjs/protobuf.js of dcodeIO and Contributors internally.
Rescript types are autogenerated.

## Contents

This is a monorepo that contains the following packages:

### @reproto/bs-protobuf

Protocol Buffer support for Rescript

Uses protobufjs/protobuf.js of dcodeIO and Contributors internally.
Rescript types are autogenerated.

Supports both Proto 2 and Proto 3.

Message encoding and decoding support. Provides a completely type safe
protobuf message implementation with fully immutable data structures.

Services support that allows for GRPC implementation via any custom rpcImpl.

Note: I have no interest in implementing grpc-web, but it could be done as a
separate package.

GRPC stream support ready.

[Read more...](packages/bs-protobuf/README.md)

[Data model](packages/bs-protobuf/DATA-MODEL.md)

### @reproto/bs-rpc-axios

An example RPC implementation that uses Axios for networking.

It implements non-streaming RPC (not real grpc, and not real grpc-web).
It works both in browsers and in Node.

[Read more...](packages/bs-rpc-axios/README.md)

### @reproto/proto-demo

A working React client + Express server example that implements
non-streaming GRPC (Not grpc-web). It uses the Axios RPC implementation
provided by the `@reproto/bs-rpc-axios` package.

[Read more...](packages/proto-demo/README.md)

## Roadmap

Status: Work in progress. Planned next:

- Documentation
- First production ready release planned for **END OF SEPTEMBER 2021**

Stay tuned!
