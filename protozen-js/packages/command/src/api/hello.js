// @flow

import '../../../../debug';
import Debug from 'debug';
import { multiParse } from './multi-parse';

const info = Debug('protozen:info:hello');

export async function hello(argv: Array<string>|void = undefined) {
  const options = multiParse(argv, yargs => (
    yargs
      .option('world', {
        alias: 'w',
        description: 'What to tell to the world',
        default: 'World'
      })
      .option('delay', {
        type: 'number',
        description: 'Delay this much milliseconds'
      })
      )
    );
  const { world, delay } = options;
  info(`Hello ${ world }!`);
  await new Promise(resolve => setTimeout(resolve, delay));
}
