// @flow

import yargs from 'yargs';
import Debug from 'debug';
import { multiParse } from './multi-parse';
import { defaultOptions } from '@protozen/service';

const info = Debug('protozen:info:service-options-parse');

export function serviceOptionsParse(argv: Array<string>|void, configFunc: yargs => yargs): Object {
  const { url, timeout } = defaultOptions({});
  const options = multiParse(argv, yargs => (
    configFunc(
      yargs
        .parserConfiguration({
          'dot-notation': false,
          'camel-case-expansion': false
        })
        .strict()
        .option('url', {
          alias: 'u',
          description: 'Back-end url',
          default: url
        })
        .option('apikey', {
          description: 'Back-end api key'
        })
        .option('apitoken', {
          description: 'Back-end api token'
        })
        .option('timeout', {
          alias: 't',
          type: 'number',
          description: 'Timeout in ms',
          default:timeout
        })
      )
    )
  );
  return options;
}

