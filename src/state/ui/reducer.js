import { combineReducers } from 'redux';
import get from 'lodash/get';

import { HISTORY_PUSH, NAV_TOGGLE, APP_READY } from './actions.js';
import { createReducer, updateObject } from '../utils';

const historyReducer = createReducer({ pathname: '' }, {
  [HISTORY_PUSH]: historyPush
});

function historyPush(state, payload) {
  return updateObject(state, { ...payload.location });
}

const initAppStatus = createReducer({ready: false}, {
  [APP_READY]: (state, payload) => ({ ...state, ...payload })
});

const globalUiReducer = createReducer({ isNavOpen: false }, {
  [NAV_TOGGLE]: navToggle
});

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
  status: initAppStatus,
  global: globalUiReducer
});

export default reducer;
