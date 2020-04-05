import axios from 'axios';

import { getToken, updateToken } from '../utils';

const ENTITY = 'FIND_BY_MAC'

var CancelToken = axios.CancelToken;
export var cancelFindByMac;

export const findByMac = ({ switchesToFindIds }) => async (dispatch) => {
  updateToken()
  dispatch({ type: `@${ENTITY}/POST_REQUEST`, payload: {} });
  try {
    var { data: { items } } = await axios.post(`/api/macs/find`, { switchesToFindIds }, {
      headers: { Token: getToken(), 'Content-Type': 'application/json' },
      cancelToken: new CancelToken(c => {
        cancelFindByMac = c;
      })
    });  } catch (error) {
    console.error(error);
    if (axios.isCancel(error)) {
      return dispatch({ type: `@${ENTITY}/POST_CANCELED`, payload: error });
    }
    return dispatch({ type: `@${ENTITY}/POST_ERROR`, payload: error });
  }

  if (items !== undefined) 
    return dispatch({ type: `@${ENTITY}/POST_SUCCESS`, payload: items });
  
  dispatch({ type: `@${ENTITY}/POST_ERROR`, payload: new Error('No `items` key found on response') });
}

export const clearMacFoundResult = {
  type: `@${ENTITY}/CLEAR_MAC_FOUND_RESULT`
};