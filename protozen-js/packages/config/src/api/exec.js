// @flow

import { spawn } from 'child_process';

import Debug from 'debug';

const info = Debug('protozen:info:exec');
const debug = Debug('protozen:debug:exec');

export async function exec(command: string) {
  debug(command);
  const exitCode = await new Promise(resolve => {
    spawn(command, {
      shell: true,
      stdio: 'inherit'
    })
      .on('exit', resolve);
  });
  if (exitCode !== 0) {
    throw new Error(`exec exit code: ${ exitCode }`);
  }
}
