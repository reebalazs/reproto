// @flow

import yargs from 'yargs';
import Debug from 'debug';

const info = Debug('protozen:info:multi-parse');

export function multiParse(argv: Array<string>|void, configFunc: yargs => yargs): Object {
  argv = configFunc(yargs).parse(argv);
  const options = {};
  for (const key in argv) {
    let cursor = options;
    const segments = key.split('.');
    const segmentsLength = segments.length;
    for (let i = 0; i < segmentsLength - 1; i++) {
      const key = segments[i];
      if (cursor[key] === undefined) {
        cursor[key] = {};
      }
      cursor = cursor[key];
    }
    const decoded = decodeURIComponent(argv[key])
    cursor[segments[segmentsLength - 1]] = decoded;
  }
  return options;
}

