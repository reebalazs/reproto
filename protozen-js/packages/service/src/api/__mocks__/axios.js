// @flow
/* global jest */

function _mock(mockFn) {
  return (mockFn: any);
}

export const put: Function = jest.fn(() => Promise.resolve({ data: {}, status: 0, text: 'STATUS' }));

class MockAxios {

  options: Object;

  put: Function = put;

  constructor(options: Object) {
    this.options = options;
  }

}

export const create = _mock(jest.fn)(options => new MockAxios(options));
