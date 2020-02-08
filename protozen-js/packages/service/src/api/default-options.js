// @flow

export function defaultOptions(options: Object): Object {
  return {
    url: 'http://127.0.0.1:8080',
    timeout: 1000,
    ...options
  }
}
