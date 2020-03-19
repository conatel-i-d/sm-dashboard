import merge from 'lodash/merge';

export const initialState = {
  nics: {},
  switches: {}
}

export function reducer(state = initialState, {type, payload}) {
  if (payload && payload.entities) {
    return merge(state, payload.entities)
  }

  return state;
}

export default reducer;