import get from 'lodash/get';

import {
  createReducer,
} from '../utils';


const ENTITY = 'FIND_BY_MAC'

export const initialState = {
    findLoading: false,
    findResult: []
};


const findSuccess = (state, payload) => {
  return {
    ...state,
      findLoading: false,
      findResult: payload
  }
}

const findFail = (state, payload) => {
  return {
    ...state,
      findLoading: false,
      findResult: []
  }
}

export const reducer = createReducer(initialState, {
  [`@${ENTITY}/POST_REQUEST`]: state => ({...state,  findLoading: true }),
  [`@${ENTITY}/POST_SUCCESS`]: findSuccess,
  [`@${ENTITY}/POST_ERROR`]: findFail,
  [`@${ENTITY}/POST_CANCELED`]: findFail
});