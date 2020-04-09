import axios from 'axios';

import { getToken, updateToken } from '../utils';

const ENTITY = 'FIND_BY_MAC'

var CancelToken = axios.CancelToken;

import { DISALLOWED_INTERFACES } from '../nics'
import get from 'lodash/get';
export var cancelFindByMac;

export const findByMac = ({ switchesToFindIds, mac }) => async (dispatch) => {
  dispatch({ type: `@${ENTITY}/POST_REQUEST`, payload: {} });
  await updateToken()
  try {
    var { data: { items } } = await axios.post(`/api/macs/find`, { switchesToFindIds, mac }, {
      headers: { Token: getToken(), 'Content-Type': 'application/json' },
      cancelToken: new CancelToken(c => {
        cancelFindByMac = c;
      })
    });  } catch (error) {
    console.error(error);
    if (axios.isCancel(error)) {
      dispatch(cancelFindByMacAwxTasks({ switchesToFindIds, errorType: "cancel"}));
      return dispatch({ type: `@${ENTITY}/POST_CANCELED`, payload: error });
    }
    dispatch(cancelFindByMacAwxTasks({ switchesToFindIds, errorType: "error"}));
    return dispatch({ type: `@${ENTITY}/POST_ERROR`, payload: error });
  }

  if (items !== undefined) 
    return dispatch({ type: `@${ENTITY}/POST_SUCCESS`, payload: items.filter(i => isValid(i)) });

  dispatch({ type: `@${ENTITY}/POST_ERROR`, payload: new Error('No `items` key found on response') });
}

function isValid(nic) {
  const name = get(nic, 'name', '').toLowerCase();
  const type = get(nic, 'type', '').toLowerCase();
  return (
    !DISALLOWED_INTERFACES.includes(name) &&
    !name.includes('vlan') &&
    !name.includes('port-channel') &&
    !name.includes('cpu') &&
    type.includes('static')
  );
}

const cancelFindByMacAwxTasks = ({ switchesToFindIds }) => async (dispatch) => {
  dispatch({ type: `@${ENTITY}/CANCEL_TASKS_POST_REQUEST`, payload: {} });
  await updateToken()
  try {
    var resp = await axios.post(`/api/macs/cancel_find_tasks`, { switchesToFindIds }, {
      headers: { Token: getToken(), 'Content-Type': 'application/json' }
    })
  } catch (error ){
    return dispatch({ type: `@${ENTITY}/CANCEL_TASKS_POST_ERROR`, payload: error });
  }
  if (resp.status === 201) 
    return dispatch({ type: `@${ENTITY}/CANCEL_TASKS_POST_SUCCESS`, payload: {} });

  dispatch({ type: `@${ENTITY}/CANCEL_TASKS_POST_ERROR`, payload: new Error('Respose status code isn\'t equal to 201') });
}