import Rest from '../utils/rest.js';
import { schema } from 'normalizr';

const ENTITY = 'logs';
const logsSchema = new schema.Entity(ENTITY);

var rest = Rest({
  entity: `${ENTITY}`,
  endpoint: `/api/${ENTITY}/`,
  schema: logsSchema,
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
export const create = rest.create;
export const edit = rest.update;
export const destroy = rest.destroy;
