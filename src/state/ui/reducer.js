import { combineReducers } from 'redux';
import get from 'lodash/get';

import {INIT, HISTORY_PUSH, NAV_TOGGLE} from './actions.js';
import { createReducer, updateObject } from '../utils';

const historyReducer = createReducer({pathname: ''}, {
  [HISTORY_PUSH]: historyPush
});

function historyPush(state, payload) {
  return updateObject(state, { pathname: payload.location.pathname });
}

const appReducer = createReducer({ready: false}, {
  [INIT]: init
});

function init(state) {
  return updateObject(state, { ready: true })
} 

const globalUiReducer = createReducer({isNavOpen: false}, {
  [NAV_TOGGLE]: navToggle
});

function navToggle(state) {
  return updateObject(state, {isNavOpen: !state.isNavOpen});
}

export function navState(state) {
  return {isNavOpen: get(state, 'ui.global.isNavOpen')};
}

export function selectPathname(state) {
  return {pathname: get(state, 'ui.history.pathname')};
}

export const uiReducer = combineReducers({
  history: historyReducer,
  app: appReducer,
  global: globalUiReducer
});

export default uiReducer;