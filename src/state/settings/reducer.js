import get from 'lodash/get';
import omit from 'lodash/omit';

import {
  createReducer,
  updateState,
} from '../utils';

const ENTITY = 'settings';

export const initialState = {
  loading: false,
  userDN: '',
  bindDN: '',
  connectionURL: '',
  bindCredential: '',
};

export const reducer = createReducer(initialState, {
  [`@${ENTITY}/GET_REQUEST`]: updateState(`loading`, () => true),
  [`@${ENTITY}/GET_SUCCESS`]: updateSettings,
});

function updateSettings(state, payload) {
  return {
    ...state,
    loading: false,
    ...payload,
  };
}

export function selectLoading(state) {
  return {
    loading: get(state, `${ENTITY}.loading`),
  };
}

export function selectSettings(state) {
  return {
    settings: omit(get(state, `${ENTITY}`), 'loading')
  };
}