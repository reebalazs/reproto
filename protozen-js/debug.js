const Debug = require('debug');

if (process.env.DEBUG === undefined) {
  Debug.enable('protozen:*,-protozen:debug:*');
}
