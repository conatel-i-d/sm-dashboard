import { of, from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { combineEpics } from 'redux-observable';

import { history$ } from '../../modules/history.js';
import { INIT, HISTORY_PUSH } from './actions.js';

export function initEpic() {
  return from([{
    type: INIT
  }, {
    type: HISTORY_PUSH,
    payload: {
      location: {
        pathname: window.location.pathname
      }
    }
  }]);
}

export function historyEpic() {
  return history$.pipe(switchMap(payload => of({
    type: '@history/PUSH',
    payload
  })))
}

export const uiEpics = combineEpics(initEpic, historyEpic);