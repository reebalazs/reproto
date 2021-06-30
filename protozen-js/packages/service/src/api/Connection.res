
type connection = unit

@module("./create-connection")
external createConnection: (
  ~url: string,
  ~apikey: string=?,
  ~apitoken: string=?,
  ~timeout: int=?,
  ~protoJs: unit,
  unit,
) => connection = "createConnection"
