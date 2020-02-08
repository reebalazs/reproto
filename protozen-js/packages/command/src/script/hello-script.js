#! /usr/bin/env node
// @flow

require('@babel/register')({
  cwd: process.env.FRONTEND_ROOT
});
// Unhandled rejections should terminate with error status
process.on('unhandledRejection', up => { throw up })
require('../api/hello.js').hello();
