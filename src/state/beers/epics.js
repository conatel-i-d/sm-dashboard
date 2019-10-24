import { map } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { schema } from 'normalizr';
import get from 'lodash/get';

import { UPDATE_STATE } from './actions.js';
import { rest$ } from '../utils';

export const API = 'https://api.punkapi.com/v2/beers';

export const restBeersEpics = rest$({
  url: (state) => {
    const page = get(state, 'beers.page', 1);
    const perPage = get(state, 'beers.perPage', 10);

    return `${API}?page=${page}&per_page=${perPage}`;
  },
  prefix: 'beers',
  create: false,
  update: false,
  delete: false,
  schema: new schema.Entity('beers'),
});

export function increasePageNumber(action$, state$) {
  return action$.pipe(
    ofType('@beers/GET_SUCCESS'), 
    map(() => ({
      type: UPDATE_STATE,
      payload: {
        page: get(state$.value, 'beers.page') + 1
      }
    })));
}

export const beersEpics = combineEpics(...restBeersEpics, increasePageNumber);