/* global jest */

export const put = jest.fn(() =>
  Promise.resolve({ data: {}, status: 0, text: "STATUS" })
);

class MockAxios {
  put = put;

  constructor(options) {
    this.options = options;
  }
}

export const create = jest.fn((options) => new MockAxios(options));
