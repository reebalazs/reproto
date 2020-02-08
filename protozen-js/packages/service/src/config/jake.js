// @flow
/* global task */

import Debug from 'debug';

const info = Debug('protozen:info:jake');

task('default', () => {
  info('Service namespace: service:test, more help with service:help');
});

task('help', () => {
  info(`\
Service namespace:

jake service:help       print this help

  `);
});


