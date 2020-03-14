import axios from 'axios';
import Rest from '../utils/rest.js';
import { getToken } from '../utils';
import { normalize, schema } from 'normalizr';

const ENTITY = 'switches';
const switchesSchema = new schema.Entity(ENTITY);
export const API = '/api/switch/';

var rest = Rest({
  entity: 'switches',
  endpoint: '/api/switch',
  schema: switchesSchema,
});

export const updateFilterInput = (filterInput) => (dispatch) => {
  return dispatch({
    type: `@${ENTITY}/UPDATE_FILTER_INPUT`,
    payload: filterInput
  });
};

export const updateSortBy = {
  type: `@${ENTITY}/UPDATE_SORT_BY`
};

export const get = rest.read;

// export const get = () => {
//   return async dispatch => {
//     const axRes = await axios.get(API, {
//       headers: { Token: getToken(), 'Content-Type': 'application/json' }
//     });
//     const response = axRes.data;
//     const result = response.items
//       ? normalize(response.items, [switchesSchema])
//       : response.item
//       ? normalize([response.item], [switchesSchema])
//       : undefined;
//     return dispatch({
//       type: `@${ENTITY}/GET_REQUEST`,
//       payload: result
//     });
//   };
// };

export const create = payload => {
  return async dispatch => {
    const axRes = await axios.post(API, payload, {
      headers: { Token: getToken(), 'Content-Type': 'application/json' }
    });
    const response = axRes.data;
    const result = response ? normalize(response, [switchesSchema]) : undefined;
    return dispatch({
      type: `@${ENTITY}/POST_REQUEST`,
      payload: result
    });
  };
};

export const edit = payload => {
  return async dispatch => {
    const axRes = await axios.put(API + (payload && payload.id ? `/${payload.id}` : ''), payload, {
      headers: { Token: getToken(), 'Content-Type': 'application/json' }
    });
    const response = axRes.data;
    const result = response ? normalize(response, [switchesSchema]) : undefined;
    return dispatch({
      type: `@${ENTITY}/POST_REQUEST`,
      payload: result
    });
  };
};

export const destroy = payload => {
  return async dispatch => {
    const axRes = await axios.delete(API + (payload && payload.id ? `/${payload.id}` : ''), {
      headers: { Token: getToken(), 'Content-Type': 'application/json' }
    });
    console.log('destroy delete result', axRes.data);
    return dispatch({
      type: `@${ENTITY}/DELETE_REQUEST`,
      payload: payload.id
    });
  };
};
