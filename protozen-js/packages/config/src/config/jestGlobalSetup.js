// @flow

/// As of 2021-08-03, this causes a circular load problem with Babel.
// Determining test suites to run...(node:88943) Warning: Accessing non-existent property 'fromObject' of module exports inside circular dependency
// (Use `node --trace-warnings ...` to show where the warning was created)
// jake aborted.
// TypeError: /Users/ree/work/protozen/rescript-playground/protozen-js/packages/config/src/config/jestGlobalSetup.js: /Users/ree/work/protozen/rescript-playground/protozen-js/node_modules/convert-source-map/index.js: _convertSourceMap(...).fromObject is not a function

import "../../../../debug";

export default function setup() {}
