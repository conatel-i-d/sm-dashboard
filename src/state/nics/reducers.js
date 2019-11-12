import get from 'lodash/get';

import { createReducer, updateState } from '../utils';

const ENTITY = 'nics';

export const initialState = {
  loading: false,
}

const toggleLoading = updateState('loading', (state) => !state.loading);

export const reducer = createReducer(initialState, {
  [`@${ENTITY}/GET_SUCCESS`]: toggleLoading,
  [`@${ENTITY}/GET_REQUEST_SENT`]: toggleLoading,
  [`@${ENTITY}/CANCELED`]: toggleLoading,
  [`@${ENTITY}/FAILURE`]: toggleLoading,
});

export function selectSwitchNics(state) {
  const pathname = get(state, 'ui.history.pathname', '');
  const switchId = pathname.replace(`/switches/`, '');

  return {
    items: get(state, `entities.switches.${switchId}.nics`, [])
  };
}