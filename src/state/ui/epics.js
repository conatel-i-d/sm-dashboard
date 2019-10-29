import { of, from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { combineEpics } from 'redux-observable';
import pick from 'lodash/pick';

import { history$ } from '../../modules/history.js';
import { INIT, HISTORY_PUSH } from './actions.js';

export function initEpic() {
  return from([{
    type: INIT
  }, {
    type: HISTORY_PUSH,
    payload: {
      location: pick(window.location, 'hash', 'key', 'pathname', 'search', 'state')
    }
  }]);
}

export function historyEpic() {
  return history$.pipe(switchMap(payload => {
    return of({
      type: '@history/PUSH',
      payload
    })
  }))
}

export const uiEpics = combineEpics(initEpic, historyEpic);