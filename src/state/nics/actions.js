import { actionCreator } from '../utils';

const ENTITY = 'nics';

export const updateSortBy = actionCreator(`@${ENTITY}/UPDATE_SORT_BY`);

export function get(payload) {
  return {
    type: '@nics/GET_REQUEST',
    payload
  };
}

export function reboot(payload) {
  return { type: '@nics/REBOOT_REQUEST', payload };
}
