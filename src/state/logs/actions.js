import { actionCreator } from '../utils';

const ENTITY = 'logs';

export const create = actionCreator(`@${ENTITY}/POST_REQUEST`);
export const get = actionCreator(`@${ENTITY}/GET_REQUEST`);
export const updateSortBy = actionCreator(`@${ENTITY}/UPDATE_SORT_BY`);
