// @flow
/* global jake, task, namespace */

import Debug from 'debug';
import path from 'path';
import supportsColor from 'supports-color';
import '../../../../debug';
import { exec } from '..';
import {runCLI} from 'jest-cli';
import type { ProjectConfig } from 'jest';
import './jake-proto.js';
import inspector from 'inspector';
import './jake-lerna.js';

const info = Debug('protozen:info:jake');
const debug = Debug('protozen:debug:jake');

if (process.env.DEV === 'true') {
  inspector.open();
  inspector.waitForDebugger();
}

const rootD = path.resolve(__dirname, '..', '..', '..', '..');

task('default', () => {
  info('Namespaces: web, service, command. Targets: install, protoc, protodesc, lint, help')
});

task('help', () => {
  info(`\
Namespaces:

web:                @protozen/web package
service:            @protozen/service package
command:            @protozen/command package

Root targets:

jake install        install or update packages
jake protoc         compile the protos
jake protodebug     compile the proto files for debugging
jake lint           lint the code
jake test           test the code
jake help           print this help

jake protodesc      compile the proto descriptor (for debuggers)
jake protomap       compile the proto view mappint (for Charles Proxy)
jake eslint         eslint, part of lint
jake flow           flow, part of lint
jake jest           same as test

Namespaces help:

jake web            print help about the web namespace
jake service        print help about the service namespace
jake command        print help about the command namespace

  `);
});

task('install', async () => {
  await exec(
    `cd ${ rootD };
    yarn install`);
});

task('eslint', async () => {
  await exec(
    `cd ${ rootD };
    \`yarn bin eslint\` . ${ supportsColor.stdout ? '--color' : '' } \
    `);
});

task('flow', async () => {
  await exec(
    `cd ${ rootD };
     \`yarn bin flow\` check \
       --color=${ supportsColor.stdout ? 'always' : 'never' } \
    `);
});

task('lint', () => {
  jake.Task['eslint'].invoke();
  jake.Task['flow'].invoke();
});


task('jest', async () => {
  const cwd = process.cwd();
  try {
    process.chdir(rootD);
    const jestConfig: ProjectConfig = {
      rootDir: rootD,
      colors: supportsColor.stdout,
      verbose: false
     };
    const result = await runCLI(jestConfig, [rootD]);
    if (! result.results.success) {
      throw new Error(`Tests failed`);
    }
  } finally {
    process.chdir(cwd);
  }
});

task('jest-watch', async () => {
  const cwd = process.cwd();
  try {
    process.chdir(rootD);
    const jestConfig: ProjectConfig = {
      rootDir: rootD,
      colors: supportsColor.stdout,
      verbose: false,
      watch: true
     };
    const result = await runCLI(jestConfig, [rootD]);
    if (! result.results.success) {
      throw new Error(`Tests failed`);
    }
  } finally {
    process.chdir(cwd);
  }
});

task('test', () => {
  jake.Task['jest'].invoke();
});

task('dev', () => {
  jake.Task['jest-watch'].invoke();
});

namespace('web', () => {
  require('../../../web/src/config/jake.js');
});

task('web', () => {
  jake.Task['web:default'].invoke();
});

namespace('service', () => {
  require('../../../service/src/config/jake.js');
});

task('service', () => {
  jake.Task['service:default'].invoke();
});

namespace('command', () => {
  try {
    require('../../../command/src/config/jake.js');
  } catch (err) {
    const commands = require('yargs').argv._;
    if (!(commands.length === 1 && ['install', 'protoc'].includes(commands[0]))) {
      info('Error importing command namespace. %s %O', err.message);
    }
  }
});

task('command', () => {
  jake.Task['command:default'].invoke();
});
