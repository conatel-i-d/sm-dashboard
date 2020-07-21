import { createReducer } from '../utils';
import get from 'lodash/get';

const ENTITY = 'alerts';

export const initialState = {
  visibles: []
};

const addAlert = (state, payload) => {
  const visibles = get(state, `${ENTITY}.visibles`, []);
  return {
    ...state,
    visibles: [...visibles, payload]
  };
};

const hideAlert = (state, payload) => {
  const visiblesSinFilter = get(state, `visibles`);
  const visibles = visiblesSinFilter.filter((alert) => alert.title !== payload);
  return {
    ...state,
      visibles
  };
};

export const reducer = createReducer(initialState, {
  [`@${ENTITY}/ADD`]: addAlert,
  [`@${ENTITY}/HIDE`]: hideAlert
});
