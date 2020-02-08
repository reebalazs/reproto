// @flow

import proto from '../../dist/proto';
import Debug from 'debug';

const { Error: ErrorProto } = proto.services;

const debug = Debug('protozen:debug:decode-error');
const info = Debug('protozen:info:decode-error');

export function decodeError(options: {
  data?: string,
  status?: number,
  text?: string
}): {
  isError: boolean,
  isProto: boolean,
  getError: () => Error
} {
  const { data, status, text } = options;
  const isError = ! status || Math.floor(status / 100) !== 2;
  let error = { isError, isProto: false, getError: () => (new Error())};
  if (isError) {
    try {
      error = ErrorProto.decode(data);
      error.isError = true;
      error.isProto = true;
    } catch(err) {};
  }
  error.getError = (): Error => {
    return new Error(`Request failed with ${
      status !== undefined ? status : 0
     }${
       error.code !== undefined ? ' [code=' + error.code + ']' : ''
     }: ${
      error.message || text || 'Unknown error'
    }`);
  };
  return error;
}

