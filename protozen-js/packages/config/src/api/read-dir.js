// @flow

import fs from 'fs';
import Debug from 'debug';

const info = Debug('protozen:info:read-dir');

export function readDir(path: string): Promise<Array<string>> {
  return new Promise(resolve => {
    fs.readdir(path, function (err, fnames) {
      if (err) {
        throw new Error(`Error reading directory ${ path } [${ err.message }]`);
      }
      resolve(fnames);
    });
  });
}
