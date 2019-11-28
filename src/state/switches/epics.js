import { combineEpics } from 'redux-observable';
import { normalize, schema } from 'normalizr';

import { rest$, getToken } from '../utils';

export const API = '/api/switch/';

export const restEpic = rest$({
  url: API,
  prefix: 'switches',
  headers: () => ({ Token: getToken(), 'Content-Type': 'application/json' }),
  schema: new schema.Entity('switches'),
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
