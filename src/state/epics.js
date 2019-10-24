import { from } from "rxjs";
import { combineEpics } from 'redux-observable';

import { beersEpics } from './beers';
import { uiEpics } from './ui'

export function tests() {
  return from([{
    type: '@beers/GET_REQUEST',
  }]);
}

export const rootEpic = combineEpics(uiEpics, beersEpics, tests);

export default rootEpic;