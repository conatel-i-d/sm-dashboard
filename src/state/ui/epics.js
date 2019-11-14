import { of, from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { switchMap, map, catchError } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';

import pick from 'lodash/pick';
import get from 'lodash/get';

import { history$, history } from '../../modules/history.js';
import {
  INIT,
  HISTORY_PUSH,
  LOGIN_REFRESH,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS
} from './actions.js';

import { ofType } from 'redux-observable';

export function initEpic() {
  return from([
    {
      type: INIT
    },
    {
      type: HISTORY_PUSH,
      payload: {
        location: pick(
          window.location,
          'hash',
          'key',
          'pathname',
          'search',
          'state'
        )
      }
    }
  ]);
}

export function handleInit(action$, state$) {
  return action$.pipe(
    ofType(INIT),
    switchMap(() => {
      const { email } = state$.value.ui.app.user;
      var refresh = localStorage.getItem('refreshToken');

      if (refresh === undefined || refresh === null || email === undefined)
        return toLoginPage();

      const ajax$ = ajax({
        url: 'api/auth/token_refresh/',
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: {
          refresh_token: refresh
        }
      }).pipe(
        map(({ response }) => {
          const accessToken = get(response, 'access_token', '');
          const refreshToken = get(response, 'refresh_token', '');

          window.localStorage.setItem('accessToken', accessToken);
          window.localStorage.setItem('refreshToken', refreshToken);

          return {
            type: LOGIN_REFRESH,
            payload: { accessToken, refreshToken }
          };
        }),
        catchError(err =>
          of({
            type: LOGIN_ERROR,
            payload:
              err.response && err.response.message ? err.response.message : err
          })
        )
      );
      return ajax$;
    })
  );
}

export function toLoginPage() {
  history.push('/login');
  return of({
    type: '@history/PUSH',
    payload: {
      location: { pathname: '/login' }
    }
  });
}

export function toHomePage() {
  history.push('/');
  return of({
    type: '@history/PUSH',
    payload: {
      location: { pathname: '/' }
    }
  });
}

export function login(action$) {
  return action$.pipe(
    ofType(LOGIN_REQUEST),
    switchMap(({ payload: { username, password } }) => {
      const ajax$ = ajax({
        url: 'api/auth/token_login/',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { username, password }
      }).pipe(
        map(({ response }) => {
          const accessToken = get(response, 'access_token', '');
          const refreshToken = get(response, 'refresh_token', '');

          window.localStorage.setItem('accessToken', accessToken);
          window.localStorage.setItem('refreshToken', refreshToken);
          toHomePage();
          return {
            type: LOGIN_SUCCESS,
            payload: { accessToken, refreshToken }
          };
        }),
        catchError(err =>
          of({
            type: LOGIN_ERROR,
            payload:
              err.response && err.response.message ? err.response.message : err
          })
        )
      );
      return ajax$;
    })
  );
}

export function historyEpic() {
  return history$.pipe(
    switchMap(payload => {
      return of({
        type: '@history/PUSH',
        payload
      });
    })
  );
}

export const epics = combineEpics(initEpic, historyEpic, handleInit, login);
