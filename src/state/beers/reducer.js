import union from 'lodash/union';
import get from 'lodash/get';
import pick from 'lodash/pick';

import { UPDATE_STATE } from './actions.js';
import { createReducer } from '../utils';

export const initialState = {
  ids: [],
  page: 1,
  perPage: 10,
  loading: false
}

export const beersReducer = createReducer(initialState, {
  '@beers/GET_SUCCESS': updateIds,
  '@beers/GET_REQUEST_SENT': toggleLoading,
  '@beers/CANCELED': toggleLoading,
  '@beers/FAILURE': toggleLoading,
  [UPDATE_STATE]: updateState,
});

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

function updateState(state, payload) {
  return {
    ...state,
    ...pick(payload, 'page', 'perPage')
  };
}

export default beersReducer;

export function selectBeer(state, props) {
  const id = get(props, 'match.params.id', undefined);
  const beers = get(state, 'entities.beers', {});

  if (id === undefined) return {};

  return {
    item: beers[id]
  };
}

export function selectBeers(state) {
  const beerIds = get(state, 'beers.ids', []);
  const beers = get(state, 'entities.beers', {});
  return {
    items: beerIds.map(id => beers[id]),
  };
}

export function beersState(state) {
  return {
    page: get(state, 'beers.page'),
    perPage: get(state, 'beers.perPage'),
    loading: get(state, 'beers.loading')
  };
}