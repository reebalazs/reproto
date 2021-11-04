# Reproto - Data Model

## General consideration

The implementation uses the `protobufjs` library, which
is a pure JavaScript implementation, for encoding the messages. On the top of this
JavaScript implementation, Rescript data types are generated from the proto definitions.

By design, the Reproto data representations of the Protocol Buffer data are

- strongly typed - as a result, data that created programmatically will always be
  encodable correctly. There is no need or point to "verify" the data before encoding.

- immutable - when stored locally the data is guaranteed to remain immutable which
  makes it possible that the received data can be used to represent an application state
  without conversion.

- identity - each binary encoded representation in the wire format corresponds to exactly
  one data representation, and vice versa. Thus there cannot be multiple non-identical
  data representations that result the same binary. This means that converting any data
  to binary and back will always yield the same data. Similarly. any binary decoded
  to data and encoded back to binary will yield the exact same binary value.

## Compiled assets

The proto compiler is provided in the same way as in other languages. It is capable to
compile a set of proto files (selected by files and folders of a matching pattern) into
a single resource.

This resource consists of a `.res` Rescript file and a `.proto.js` support file. These has
to be kept next to each other but can be freely renamed, removed together as desired.

For example, if the resource is called `MyProtocol.res`, then all definitions can be
accessed from the `MyProtocol` rescript module.

## Packages

Protobuf packages are represented as rescript modules. Each protobuf package corresponds to
a rescript module name. The first letter of a module name is capitalized in Rescript.

Example: provided that `MyProtocol` contains the definitions, the following protocol definition:

```
syntax = "proto3";

package myGroup.myPackage;

message Basic {
  string stringField = 1;
  int32 int32Field = 2;
}
```

will be converted to the rescript module `Myprotocol.MyGroup.MyPackage`.

A package may contain

- further packages
- message classes
- emun definitions

For example, the following can be used to access the myPackage module:

```
open MyProtocol
open MyGroup.MyPackage
```

## Message Classes

A message class is represented by a Rescript record. The record contains the fields of
the protocol buffer definition.

### The message class module

For each message class, a Rescript module with the same name is generated. The module contains
the following members:

#### t

`t` defines the record type that represents the message class.

For example, the following can be used to access the type of the Basic message class:

```
open MyProtocol
open MyGroup.MyPackage

// Access the Basic message class type
type myType = Basic.t
```

A message can be created like a record:

```
let message: Basic.t = {
  stringField: "How many items",
  int32Field: 42,
}
```

If a message is created like a record, all fields must be present and specified in the record.
There is an alternate creation function `make` provided, that allows fields with default values
to be created automatically, without the need to explicitly list each field. The default
values are characteristic for each field type.

#### make

Make is a creation helper function. Its advantage to using the record format for creation
of optional fields is
that default values are created automatically. This behaviour is also the same with proto2
syntax.

```
syntax = "proto3"; // or syntax = "proto2";

package myGroup.myPackage;

message OptionalBasic {
  optional string stringField = 1;
  optional int32 int32Field = 2;
}
```

```
let message = OptionalBasic.make(~stringField="How many items", ~int32Field=42, ())
Js.log(message.stringField) // => How many items
Js.log(message.int32Field) // => 42

let message = OptionalBasic.make(~stringField="How many items", ())
Js.log(message.stringField) // => How many items
Js.log(message.int32Field) // => 0

let message = OptionalBasic.make(())
Js.log(message.stringField) // =>
Js.log(message.int32Field) // => 0

```

Note that because of optionality of fields, the unit `()` must always be present at the end of the
parameter list.

With proto3 non-optional fields, or with proto2 required fields, the default values are not
provided, and must be specified with make for each non-optional field, in the same way
as with the record creation.

```
let message = Basic.make(~stringField="How many items", ~int32Field=42, ())
Js.log(message.stringField) // => How many items
Js.log(message.int32Field) // => 42

let message = Basic.make(~stringField="How many items", ())
// => Compilation error, intField is missing

let message = Basic.make(())
// => Compilation error, stringField and intField are missing
```

#### encode

TBD

#### decode

TBD

### Optionality

Optionality works differently in proto3 and proto2.

#### proto3

In Proto3 an optional field is compiled into an option type. This means that the field
values will be `Some(v)` or `None`, when the field is not present. Note that if the
message is created as a record,

```
syntax = "proto3";

package myGroup.myPackage;

message OptionalBasic {
  optional string stringField = 1;
  optional int32 int32Field = 2;
}

let message: OptionalBasic.t = {
  stringField: Some("How many items"),
  int32Field: None,
}
```

The `make` helper function will add missing fields automatically, without the need to specify them.

```
let message = OptionalBasic.make(~stringField="How many items", ~int32Field=42, ())
Js.log(message.stringField) // => How many items
Js.log(message.int32Field) // => 42

let message = OptionalBasic.make(~stringField="How many items", ())
Js.log(message.stringField) // => How many items
Js.log(message.int32Field) // => undefined

let message = OptionalBasic.make(())
Js.log(message.stringField) // => undefined
Js.log(message.int32Field) // => undefined

```

#### proto2

In Proto2 the optional/required definitions make no difference in the data representation. An optional field will always be present in the payload and thus it will always be present in the
record as well.

The only difference that optional/required causes is in the difference of the `make` helper
function. For required fields, the default values are not generated with the make function, so
the required fields must always be specified with `make`, or else a Rescript compilation error will occur.

```
syntax = "proto2";

package myGroup.myPackage;

message RequiredBasic {
  required string stringField = 1;
  required int32 int32Field = 2;
}
```

```
let message = RequiredBasic.make(~stringField="How many items", ~int32Field=42, ())
Js.log(message.stringField) // => How many items
Js.log(message.int32Field) // => 42

let message = RequiredBasic.make(~stringField="How many items", ())
// => Compilation error, intField is missing

let message = RequiredBasic.make(())
// => Compilation error, stringField and intField are missing
```
