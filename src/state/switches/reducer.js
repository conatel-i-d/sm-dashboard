import union from 'lodash/union';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import lodashSortBy from 'lodash/sortBy';
import Fuse from 'fuse.js';
import {
  SortByDirection
} from '@patternfly/react-table';

import { createReducer } from '../utils';

const ENTITY = 'switches'

export const initialState = {
  ids: [],
  loading: false,
  isModalOpen: false,
  sortBy: {
    index: 0,
    key: 'id',
    direction: 'asc'
  }
}

const toggleModal = updateState('isModalOpen', (state) => !state.isModalOpen);
const toggleLoading = updateState('loading', (state) => !state.loading);

export const reducer = createReducer(initialState, {
  [`@${ENTITY}/GET_SUCCESS`]: updateIds,
  [`@${ENTITY}/POST_SUCCESS`]: updateIds,
  [`@${ENTITY}/GET_REQUEST_SENT`]: toggleLoading,
  [`@${ENTITY}/POST_REQUEST_SENT`]: toggleLoading,
  [`@${ENTITY}/CANCELED`]: toggleLoading,
  [`@${ENTITY}/FAILURE`]: toggleLoading,
  [`@${ENTITY}/TOGGLE_MODAL`]: toggleModal,
  [`@${ENTITY}/UPDATE_FILTER_INPUT`]: updateState('filterInput'),
  [`@${ENTITY}/UPDATE_SORT_BY`]: updateState('sortBy'),
});

function updateState(key, stateTransform) {
  return function (state, payload) {
    return {
      ...state,
      [key]: isFunction(stateTransform) 
        ? stateTransform(state, payload) 
        : payload 
    };
  };
}

function updateIds(state, payload) {
  return {
    ...state,
    loading: false,
    ids: union(state.ids, payload.result)
  }
}

export default reducer;

export function selectOne(state, props) {
  const id = get(props, 'match.params.id', undefined);
  const collection = get(state, `entities.${ENTITY}`, {});

  if (id === undefined) return {};

  return {
    item: collection[id]
  };
}

const FUSE_OPTIONS = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "name",
    "description",
    "model",
    "ip"
  ]
}

export function filterItems(items, filterInput, options) {
  const fuse = new Fuse(items, options);
  return fuse.search(filterInput);
}

export function sortItems(items, sortBy = {}) {
  if (sortBy.key === undefined || sortBy.direction === undefined) return items;
  const { key, direction } = sortBy;
  items = lodashSortBy(items, key);
  return direction === SortByDirection.asc ? items : items.reverse();
}

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

export function getState(state) {
  return {
    loading: get(state, `${ENTITY}.loading`),
    isModalOpen: get(state, `${ENTITY}.isModalOpen`),
    sortBy: get(state, `${ENTITY}.sortBy`)
  };
}