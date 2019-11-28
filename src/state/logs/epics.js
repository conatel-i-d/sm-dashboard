import { combineEpics } from 'redux-observable';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { normalize, schema } from 'normalizr';

import { rest$, getToken } from '../utils';

const requestRegEx = /_REQUEST/;
const successRegEx = /_SUCCESS/;
const failureRegEx = /_FAILURE/;

export function logsEpic(action$) {
  return action$.pipe(
    filter(({ type }) => {
      return (
        successRegEx.test(type) ||
        failureRegEx.test(type) ||
        requestRegEx.test(type)
      );
    }),
    switchMap(({ type, payload }) => {
      const [first, second] = type.split('/');

      const [event_type, event_result] = second.split('_');

      const [, entity] = first.split('@');

      const body = {
        entity,
        event_type,
        event_result,
        user_id: '1',
        payload: event_type !== 'GET' ? JSON.stringify(payload) : undefined
      };

      console.log(payload);

      const ajax$ = ajax({
        url: '/api/logs/',
        method: 'POST',
        headers: { Token: getToken(), 'Content-Type': 'application/json' },
        body
      }).pipe(
        map(() => {
          return {
            type: '@app/LOGS_POST_CORRECT'
          };
        }),
        catchError(err => {
          console.error(err);
          return of({ type: '@app/LOGS_ERROR' });
        })
      );
      return ajax$;
    })
  );
}

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

export const epics = combineEpics(logsEpic, ...restEpic);
