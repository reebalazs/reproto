// @flow

import { snake } from 'change-case';
import Debug from 'debug';

const debug = Debug('protozen:debug:rpc-path');
const info = Debug('protozen:info:rpc-path');

export function rpcPath(serviceName: string, methodName: string): string {
  // UserService => users, SomeUserService => some_users
  const rpcServiceName = snake(serviceName.replace(/Service$/, 's'));
  // Create => create, DoSomething => do_something
  const rpcMethodName = snake(methodName);
  const rpcPath = `/api/1.0/${ rpcServiceName }/${ rpcMethodName }`;
  return rpcPath;
}
