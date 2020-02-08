// @flow
/* global task */

import path from 'path';
import Debug from 'debug';
import inspector from 'inspector';
import { hello, createAccount, createUser } from '@protozen/command';
import { exec } from '@protozen/config';

const info = Debug('protozen:info:jake');

const rootD = path.resolve(__dirname, '..', '..');

task('default', () => {
  info('Command namespace: command:hello, command:create-account, command:create-user more help with command:help');
});

task('help', () => {
  info(`\
Command namespace:

jake command:create-account          create account
jake command:create-user             create user

jake command:hello                   say hello (used for testing)
jake command:help                    print this help

  `);
});

function processArgs(find: string, args: Array<string>, pushArgs?: Array<string> = [], yes?: Array<string>|string, no?: Array<string>|string): boolean {
  let found = false;
  while(true) {
    const pos = args.indexOf(find);
    if (pos == -1) {
      break;
    }
    args.splice(pos, 1);
    found = true;
  }
  let adding = found ? yes : no;
  if (adding !== undefined) {
     if (typeof adding === 'string') {
      adding = [ adding ];
    }
    for (const arg of adding) {
      pushArgs.push(arg);
    }
  }
  return found;
}

async function runCommand(commandName: string, commandFunc: function, args: Array<string>) {
  const nodeOptions = [];
  const dev = processArgs('dev', args, nodeOptions, '--inspect-brk');
  const bin = processArgs('bin', args);
  if (bin) {
    await exec(
      `BIN=\`cd "${ rootD }"; yarn bin ${ commandName }\`
      NODE_OPTIONS="${ nodeOptions.join(' ') }" $BIN ${ args.join(' ') }
      `);
  } else {
    if (dev && process.env.DEV !== 'true') {
      inspector.open();
      inspector.waitForDebugger();
    }
    await commandFunc(args);
  }
}

task('hello', (...args) => {
  runCommand('hello', hello, args);
});

task('create-account', async (...args) => {
  await runCommand('create-account', createAccount, args);
});

task('create-user', async (...args) => {
  await runCommand('create-user', createUser, args);
});
