// @flow

import { snake } from "change-case";
import Debug from "debug";

const debug = Debug("protozen:debug:rpc-path");
const info = Debug("protozen:info:rpc-path");

export function rpcPath(servicePath: string, methodName: string): string {
  // package.package2.UserService => package/package2/user, SomeUserService => some_user_service
  const rpcServiceName = servicePath
    .split(".")
    .map((segment) => snake(segment))
    .join("/");
  // Create => create, DoSomething => do_something
  const rpcMethodName = snake(methodName);
  const rpcPath = `/api/1.0/${rpcServiceName}/${rpcMethodName}`;
  return rpcPath;
}
