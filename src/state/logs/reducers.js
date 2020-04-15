import {
  createReducer,
  updateIds,
  updateObject,
  sortItems,
  filterItems,
  updateState
} from '../utils';

import get from 'lodash/get';

const ENTITY = 'logs';

const FUSE_OPTIONS = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 1000,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'http_method',
    'http_url',
    'payload',
    'user_name',
    'user_email',
    'date_start',
    'response_status_code',
    'message',
    'date_end'
  ]
};

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
  [`@${ENTITY}/GET_REQUEST`]: updateState(`loading`, () => true),
  [`@${ENTITY}/GET_SUCCESS`]: updateIds,
  [`@${ENTITY}/POST_SUCCESS`]: updateIds,
  [`@${ENTITY}/PUT_SUCCESS`]: updateIds,
  [`@${ENTITY}/DELETE_SUCCESS`]: removeId,
  [`@${ENTITY}/UPDATE_FILTER_INPUT`]: updateState('filterInput'),
  [`@${ENTITY}/UPDATE_SORT_BY`]: updateState('sortBy')
});

function removeId(state, payload) {
  return updateObject(state, {
    loading: false,
    ids: state.ids.filter((id) => id !== payload)
  });
}

export default reducer;


export function selectAll(state) {
  const ids = get(state, `${ENTITY}.ids`, []);
  const collection = get(state, `entities.${ENTITY}`, {});
  const filterInput = get(state, `${ENTITY}.filterInput`, '');
  const sortBy = get(state, `${ENTITY}.sortBy`, '');
  let items = ids
    .map((id) => collection[id])
    .filter((item) => item !== undefined);
  if (filterInput !== '') {
    items = filterItems(items, filterInput, FUSE_OPTIONS);
  } else {
    items = sortItems(items, sortBy);
  }
  return { items };
}