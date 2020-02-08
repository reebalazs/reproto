// @flow
/* global task */

import path from 'path';
import supportsColor from 'supports-color';
import Debug from 'debug';
import { exec } from '@protozen/config';

const info = Debug('protozen:info:jake');

const rootD = path.resolve(__dirname, '..', '..');

task('default', () => {
  info('Web namespace: web:dev, more help with web:help');
});

task('help', () => {
  info(`\
Web namespace:

jake web:dev        start development server
jake web:help       print this help

  `);
});

task('dev', async () => {
  const configFile = path.join(rootD, 'src', 'config', 'webpack.config.js');
   await exec(
    `cd ${ rootD };
    \`yarn bin webpack-dev-server\` \
       --config ${ configFile } \
       --progress ${ supportsColor.stdout ? '--colors' : '' } \
    `);
});
