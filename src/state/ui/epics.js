import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import pick from 'lodash/pick';

import { history$ } from '../../modules/history.js';
import { INIT, HISTORY_PUSH } from './actions.js';

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

export const epics = combineEpics(initEpic, historyEpic);
