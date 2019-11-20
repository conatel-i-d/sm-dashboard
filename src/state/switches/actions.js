import { actionCreator } from '../utils';

const ENTITY = 'switches';

export const get = actionCreator(`@${ENTITY}/GET_REQUEST`);
export const create = actionCreator(`@${ENTITY}/POST_REQUEST`);
export const edit = actionCreator(`@${ENTITY}/PUT_REQUEST`);
export const destroy = actionCreator(`@${ENTITY}/DELETE_REQUEST`);
export const updateFilterInput = actionCreator(
  `@${ENTITY}/UPDATE_FILTER_INPUT`
);
export const updateSortBy = actionCreator(`@${ENTITY}/UPDATE_SORT_BY`);
