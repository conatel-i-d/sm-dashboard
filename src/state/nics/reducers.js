import get from 'lodash/get';

import { createReducer, updateState, sortItems } from '../utils';

const ENTITY = 'nics';

export const initialState = {
  loading: false
};

const toggleLoading = updateState('loading', state => !state.loading);

export const reducer = createReducer(initialState, {
  [`@${ENTITY}/GET_SUCCESS`]: toggleLoading,
  [`@${ENTITY}/GET_REQUEST_SENT`]: toggleLoading,
  [`@${ENTITY}/CANCELED`]: toggleLoading,
  [`@${ENTITY}/FAILURE`]: toggleLoading,
  [`@${ENTITY}/UPDATE_SORT_BY`]: updateState('sortBy')
});

export function getLoading(state) {
  return {
    loading: get(state, 'nics.loading')
  };
}

export function getState(state) {
  return {
    sortBy: get(state, `${ENTITY}.sortBy`)
  };
}

export function selectSwitchNics(state) {
  const pathname = get(state, 'ui.history.pathname', '');
  const switchId = pathname.replace(`/switches/`, '');
  const sortBy = get(state, `${ENTITY}.sortBy`, '');
  let items = get(state, `entities.switches.${switchId}.nics`, []);
  items = sortItems(items, sortBy);
  return {
    items,
    switchId
  };
}
