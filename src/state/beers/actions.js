import pick from 'lodash/pick';

export const UPDATE_STATE = '@beers/UPDATE_STATE';

export function beersGet() {
  return { type: '@beers/GET_REQUEST' }
}

export function updateState(payload) {
  return {
    type: UPDATE_STATE,
    payload: pick(payload, 'page', 'perPage')
  };
}