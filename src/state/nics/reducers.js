import get from 'lodash/get';

import { createReducer, updateState, sortItems, filterItems } from '../utils';

const ENTITY = 'nics';

export const initialState = {
  loading: false,
  sortBy: {
    index: 0,
    key: 'name',
    direction: 'asc'
  }
};

const FUSE_OPTIONS = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['name', 'description', 'protocol', 'adminisrtative_mode']
};

const toggleLoading = updateState('loading', state => !state.loading);

export const reducer = createReducer(initialState, {
  [`@${ENTITY}/GET_SUCCESS`]: toggleLoading,
  [`@${ENTITY}/GET_REQUEST_SENT`]: toggleLoading,
  [`@${ENTITY}/CANCELED`]: toggleLoading,
  [`@${ENTITY}/FAILURE`]: toggleLoading,
  [`@${ENTITY}/UPDATE_SORT_BY`]: updateState('sortBy'),
  [`@${ENTITY}/UPDATE_FILTER_INPUT`]: updateState('filterInput')
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

export function selectSwitchNicsCount(state) {
  const {items} = selectSwitchNics(state);
  return {count: items.length};
}

export function selectSwitchNics(state) {
  let items = getNics(state);
  const switchId = getSwitchId(state);
  const sortBy = get(state, `${ENTITY}.sortBy`, '');
  const filterInput = get(state, `${ENTITY}.filterInput`, '');
  if (filterInput !== '') {
    items = filterItems(items, filterInput, FUSE_OPTIONS);
  } else {
    items = sortItems(items, sortBy);
  }
  return {
    items,
    switchId
  };
}

function getNics(state) {
  const switchId = getSwitchId(state);
  return get(state, `entities.switches.${switchId}.nics`, []);
}

function getSwitchId(state) {
  const pathname = get(state, 'ui.history.pathname', '');
  return pathname.replace(`/switches/`, '');
}
