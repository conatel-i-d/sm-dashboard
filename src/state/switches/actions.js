import Rest from '../utils/rest.js';
import { schema } from 'normalizr';

const ENTITY = 'switches';
const switchesSchema = new schema.Entity(ENTITY);
export const API = '/api/switch/';

export const updateFilterInput = (filterInput) => (dispatch) => {
  return dispatch({
    type: `@${ENTITY}/UPDATE_FILTER_INPUT`,
    payload: filterInput
  });
};

export const updateSortBy = {
  type: `@${ENTITY}/UPDATE_SORT_BY`
};

var rest = Rest({
  entity: 'switches',
  endpoint: '/api/switch/',
  schema: switchesSchema,
});

export const get = rest.read;
export const create = rest.create;
export const edit = rest.update;
export const destroy = rest.destroy;