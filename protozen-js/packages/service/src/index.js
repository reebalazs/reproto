// @flow

export { Connection } from './api/connection';
export { defaultOptions } from './api/default-options';
// $FlowFixMe
import proto from '../dist/proto';
proto['public'] = proto.public_;
const { HelloService } = proto.services;
export { HelloService };
