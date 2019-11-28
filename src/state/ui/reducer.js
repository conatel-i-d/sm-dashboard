import { combineReducers } from 'redux';
import get from 'lodash/get';

import { INIT, HISTORY_PUSH, NAV_TOGGLE } from './actions.js';
import { createReducer, updateObject } from '../utils';

const historyReducer = createReducer(
  { pathname: '' },
  {
    [HISTORY_PUSH]: historyPush
  }
);

function historyPush(state, payload) {
  return updateObject(state, { ...payload.location });
}

const appReducer = createReducer(
  { ready: false, user: {}, errors: {} },
  {
    [INIT]: init
  }
);

function init(state) {
  return updateObject(state, { ready: true });
}

const globalUiReducer = createReducer(
  { isNavOpen: false },
  {
    [NAV_TOGGLE]: navToggle
  }
);

function navToggle(state) {
  return updateObject(state, { isNavOpen: !state.isNavOpen });
}

export function navState(state) {
  return { isNavOpen: get(state, 'ui.global.isNavOpen') };
}

export function selectPathname(state) {
  return { pathname: get(state, 'ui.history.pathname') };
}

export function getLoginState(state) {
  return {
    loading: get(state, `login.loading`),
    error: get(state, 'app.errors.login')
  };
}

export const reducer = combineReducers({
  history: historyReducer,
  app: appReducer,
  global: globalUiReducer
});

export default reducer;
