import axios from 'axios';

import { getToken, updateToken } from '../utils';

const ENTITY = 'FIND_BY_MAC'

var CancelToken = axios.CancelToken;


export var cancelFindByMac;

export const findByMac = ({ switchesToFindIds, mac }) => async (dispatch) => {
  updateToken()
  dispatch({ type: `@${ENTITY}/POST_REQUEST`, payload: {} });
  try {
    console.log("before send to macs/find", { switchesToFindIds, mac })
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
    return dispatch({ type: `@${ENTITY}/POST_SUCCESS`, payload: items });

  dispatch({ type: `@${ENTITY}/POST_ERROR`, payload: new Error('No `items` key found on response') });
}

const cancelFindByMacAwxTasks = ({ switchesToFindIds, errorType }) => async (dispatch) => {
  updateToken()
  dispatch({ type: `@${ENTITY}/CANCEL_TASKS_POST_REQUEST`, payload: {} });
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