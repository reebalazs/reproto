// @flow
/* global test, expect */

import Debug from 'debug';
import { Connection, AccountService } from '@protozen/service';
import { create, put } from 'axios';

const info = Debug('protozen:info:connection-test');

test('setup parameters', async () => {
  const connection = new Connection({
    url: 'http://127.0.0.1:7070',
    apikey: '7f12684b-ea77-4ca4-813b-0def2fc576bb',
    apitoken: 'NDIwaEpYZmZ1NkMveFROZnF4T1h6cFJCK3VROFpRbC9oODZ2eW5qeTNoaGxWamJnV1MrRm90Y1JHcmRRWlhDc2daT250cWF4NXVvPQ--',
    timeout: 5000
  });
  connection.createService(AccountService);
  expect(create).toHaveBeenCalledWith({
    baseURL: "http://127.0.0.1:7070",
    headers: {
      "Content-Type": "application/x-protobuf",
      "X-Protozen-Api-Key": '7f12684b-ea77-4ca4-813b-0def2fc576bb',
      "X-Protozen-Api-Token": 'NDIwaEpYZmZ1NkMveFROZnF4T1h6cFJCK3VROFpRbC9oODZ2eW5qeTNoaGxWamJnV1MrRm90Y1JHcmRRWlhDc2daT250cWF4NXVvPQ--'
    },
    responseType: 'arraybuffer',
    timeout: 5000
  });
});

test('service methods', async () => {
  const connection = new Connection({
    apikey: 'APIKEY',
    apitoken: 'APITOKEN'
  });
  const accountService = connection.createService(AccountService);
  expect(typeof accountService.create).toEqual('function');
  expect(typeof accountService.list).toEqual('function');
  expect(typeof accountService.lookup).toEqual('function');
  expect(typeof accountService.get).toEqual('function');
  expect(typeof accountService.listTasks).toEqual('function');
 });

test('error response', async () => {
  put.mockImplementationOnce(() =>
    Promise.resolve({ data: 'dummy_response_data_here', status: 500, text: 'ERROR' })
  );
  const connection = new Connection({
    url: 'http://127.0.0.1:8080',
    apikey: 'APIKEY',
    apitoken: 'APITOKEN'
  });
  const accountService = connection.createService(AccountService);
  const message = {};
  await expect(accountService.create(message)).rejects.toThrow('Request failed with 500: ERROR');
  expect(create).toHaveBeenCalledWith({
    baseURL: 'http://127.0.0.1:8080',
    headers: {
      'Content-Type': 'application/x-protobuf',
      'X-Protozen-Api-Key': 'APIKEY',
      'X-Protozen-Api-Token': 'APITOKEN'
    },
    responseType: 'arraybuffer',
    timeout: 1000
  });
  expect(put).toHaveBeenCalledWith('/api/1.0/accounts/create', Buffer.from([]));
});

test('empty response', async () => {
  put.mockImplementationOnce(() =>
    Promise.resolve({ data: Buffer.from([]), status: 200, text: 'OK' })
  );
  const connection = new Connection({
    url: 'http://127.0.0.1:7070',
    apikey: 'APIKEY',
    apitoken: 'APITOKEN'
  });
  const accountService = connection.createService(AccountService);
  const message = {};
  const response = await accountService.create(message);
  expect(response).toEqual({});
  expect(create).toHaveBeenCalledWith({
    baseURL: 'http://127.0.0.1:8080',
    headers: {
      'Content-Type': 'application/x-protobuf',
      'X-Protozen-Api-Key': 'APIKEY',
      'X-Protozen-Api-Token': 'APITOKEN'
    },
    responseType: 'arraybuffer',
    timeout: 1000
  });
  expect(put).toHaveBeenCalledWith('/api/1.0/accounts/create', Buffer.from([]));
});
