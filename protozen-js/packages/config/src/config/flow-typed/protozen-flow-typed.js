/* eslint-disable */

declare var jake: {
//   exec: (command: Array<string>, options?: {
//     interactive?: boolean,
//     printStdout?: boolean,
//     printStderr?: boolean,
//     breakOnError?: boolean
//     }, callback: ?function) => void;
  Task:  { [string]: {
    invoke: function
  }}
}

declare function task(name: string, dependenciesOrAction: function, action: ?function): void;
declare function file(name: string, dependenciesOrAction: function, action: ?function): void;
declare function namespace(name: string, namespaceTasks: function): void;
declare function describe(name: string): void;
declare function complete(): void;

declare var expect: {
  <T>(actual: T, message?: string): ExpectChain<T>,
  fail: ((message?: string) => void) & ((actual: any, expected: any, message?: string, operator?: string) => void),
  ...
}

declare module inspector {
  declare function open(): void;
  declare function waitForDebugger(): void;
}
