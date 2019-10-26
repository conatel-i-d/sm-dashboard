import { combineEpics } from 'redux-observable';
import { schema } from 'normalizr';

import { rest$ } from '../utils';

export const API = '/api/switch/';

export const restEpic = rest$({
  url: API,
  prefix: 'switches',
  schema: new schema.Entity('switches'),
  parseResponse: (response) => {
    if (response.items) return response.items;
    if (response.item) return [response.item];
    return response;
  }
});

export const switchesEpics = combineEpics(...restEpic);