import merge from 'lodash/merge';

export const initialState = {
  beers: {}
}

export function entitiesReducer(state = initialState, {type, payload}) {
  if (type.search(/\/GET_SUCCESS/) > -1 && payload && payload.entities) {
    return merge(state, payload.entities)
  }

  return state;
}

export default entitiesReducer;