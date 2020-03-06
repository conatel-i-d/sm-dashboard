import { combineEpics } from 'redux-observable';

import { normalize, schema } from 'normalizr';

import { rest$ } from '../utils';

export const API = '/api/logs/';

export const restEpic = rest$({
  create: false,
  delete: false,
  update: false,
  url: API,
  prefix: 'logs',
  schema: new schema.Entity('logs'),
  parseResponse: (response, options, payload) => {
    if (options.method === 'DELETE') {
      return payload.id;
    }
    return response.items
      ? normalize(response.items, [options.schema])
      : response.item
      ? normalize([response.item], [options.schema])
      : undefined;
  }
});

export const epics = combineEpics(...restEpic);
