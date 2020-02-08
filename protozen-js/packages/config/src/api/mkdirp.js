// @flow

import mkdirpOrig from 'mkdirp';
import Debug from 'debug';

const info = Debug('protozen:info:mkdirp');

export function mkdirp(fname: string): Promise<void> {
  return new Promise(resolve => {
    mkdirpOrig(fname, function (err) {
      if (err) {
        throw new Error(`Error creating directory ${ fname } [${ err }]`);
      }
      resolve();
    });
  });
}
