import union from 'lodash/union';
import get from 'lodash/get';
import Fuse from 'fuse.js';

import { createReducer } from '../utils';

const entity = 'switches'

export const initialState = {
  ids: [],
  loading: false,
  isModalOpen: false
}

export const reducer = createReducer(initialState, {
  [`@${entity}/GET_SUCCESS`]: updateIds,
  [`@${entity}/POST_SUCCESS`]: updateIds,
  [`@${entity}/GET_REQUEST_SENT`]: toggleLoading,
  [`@${entity}/POST_REQUEST_SENT`]: toggleLoading,
  [`@${entity}/CANCELED`]: toggleLoading,
  [`@${entity}/FAILURE`]: toggleLoading,
  [`@${entity}/TOGGLE_MODAL`]: toggleModal,
  [`@${entity}/UPDATE_FILTER_INPUT`]: updateFilterInput,
});

function toggleModal(state) {
  return {
    ...state,
    isModalOpen: !state.isModalOpen
  };
}

function toggleLoading(state) {
  return {
    ...state,
    loading: !state.loading
  }
}

function updateIds(state, payload) {
  return {
    ...state,
    loading: false,
    ids: union(state.ids, payload.result)
  }
}

function updateFilterInput(state, payload) {
  return {
    ...state,
    filterInput: payload
  }
}

export default reducer;

export function selectOne(state, props) {
  const id = get(props, 'match.params.id', undefined);
  const collection = get(state, `entities.${entity}`, {});

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

export function selectAll(state) {
  const ids = get(state, `${entity}.ids`, []);
  const collection = get(state, `entities.${entity}`, {});
  const filterInput = get(state, `${entity}.filterInput`, '');
  let items = ids.map(id => collection[id]).filter(item => item !== undefined);
  if (filterInput !== '') {
    const fuse = new Fuse(items, FUSE_OPTIONS);
    items = fuse.search(filterInput);
    console.log(filterInput, items);
  }

  return { items };
}

export function getState(state) {
  return {
    loading: get(state, `${entity}.loading`),
    isModalOpen: get(state, `${entity}.isModalOpen`)
  };
}