import {
  createReducer,
  updateIds,
  sortItems,
  filterItems,
  updateState
} from '../utils';

import get from 'lodash/get';

const ENTITY = 'logs';

export const initialState = {
  ids: [],
  loading: false,
  sortBy: {
    index: 0,
    key: 'date',
    direction: 'desc'
  }
};

export const reducer = createReducer(initialState, {
  [`@${ENTITY}/GET_SUCCESS`]: updateIds,
  [`@${ENTITY}/UPDATE_SORT_BY`]: updateState('sortBy')
});

export function getState(state) {
  return {
    loading: get(state, `${ENTITY}.loading`),
    sortBy: get(state, `${ENTITY}.sortBy`),
  };
}

const FUSE_OPTIONS = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['event_type', 'user_id', 'date', 'entity']
};

export function selectAll(state) {
  const ids = get(state, `${ENTITY}.ids`, []);
  const collection = get(state, `entities.${ENTITY}`, {});
  const filterInput = get(state, `${ENTITY}.filterInput`, '');
  const sortBy = get(state, `${ENTITY}.sortBy`, '');
  let items = ids.map(id => collection[id]).filter(item => item !== undefined);
  if (filterInput !== '') {
    items = filterItems(items, filterInput, FUSE_OPTIONS);
  } else {
    items = sortItems(items, sortBy);
  }
  return { items };
}
