// @flow

import type { Axios } from 'axios';
import Debug from 'debug';
import { create } from 'axios';
import { defaultOptions } from './default-options';
import { rpcPath } from '@protozen/config';
import { decodeError } from './decode-error'

const debug = Debug('protozen:debug:connection');
const info = Debug('protozen:info:connection');

type totallyUnrelated = Axios; // eslint-disable-line

export class Connection {

  options: {
    url: string,
    apikey: string,
    apitoken: string,
    timeout: number
  };
  #axios: Axios;

  constructor(options: {
    url?: string,
    apikey: string,
    apitoken: string,
    timeout?: number
  }) {
    const { url, apikey, apitoken, timeout } = this.options = defaultOptions(options);
    this.#axios = create({
      baseURL: url,
      timeout,
      headers: {
        'Content-Type': 'application/x-protobuf',
        'X-Protozen-Api-Key': apikey,
        'X-Protozen-Api-Token': apitoken
      },
      responseType: 'arraybuffer'
    });
  }

  createService(Service: Object): Object {
    const rpcImpl = async (method, requestData, callback) => {
      const path = rpcPath(Service.name, method.name);
      const response = await new Promise(async resolve => {
        const response = await this.#axios.put(path, requestData)
          .catch(error => {
            resolve(error.response || { text: error.message });
          });
        resolve(response);
      });
      const protoError = decodeError(response);
      if (protoError.isError) {
        const error = protoError.getError();
        callback(error, null);
      } else {
        callback(null, response.data);
      }
    }
    const service = Service.create(rpcImpl, false, false);
    return service;
  }

}
