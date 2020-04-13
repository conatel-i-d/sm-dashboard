import axios from 'axios';
import { getToken, updateToken } from '../utils';

import { DISALLOWED_INTERFACES } from '../nics';
import get from 'lodash/get';

var CancelToken = axios.CancelToken;
const ENTITY = 'FIND_BY_MAC';

export var cancelFindByMac;

export const findByMac = ({ switchesToFindIds, mac }) => async (dispatch) => {
  dispatch({ type: `@${ENTITY}/POST_REQUEST`, payload: {} });
  try {
    await updateToken();
    var {
      data: { items }
    } = await axios.post(
      `/api/macs/find`,
      { switchesToFindIds },
      {
        headers: { Token: getToken(), 'Content-Type': 'application/json' },
        cancelToken: new CancelToken((c) => {
          cancelFindByMac = c;
        })
      }
    );
  } catch (error) {
    console.error(error);
    if (axios.isCancel(error)) {
      dispatch(
        cancelFindByMacAwxTasks({ switchesToFindIds, errorType: 'cancel' })
      );
      return dispatch({ type: `@${ENTITY}/POST_CANCELED`, payload: error });
    }
    dispatch(
      cancelFindByMacAwxTasks({ switchesToFindIds, errorType: 'error' })
    );
    return dispatch({ type: `@${ENTITY}/POST_ERROR`, payload: error });
  }
  console.log("items", items);
  const startTime  = new Date()
  console.log(`Starting ${startTime}...`)
  if (items !== undefined) {
    const result = [];
    items.map((sw) => {
      console.log(`${new Date()} sw: `, sw.name);
      // por cada sw, me filtro las interfces validas y las retorno como [[<nic_name>, <nic_value>]]
      const filterNics = Object.entries(sw.interfaces).filter(([nic_name]) => {
        console.log("filte nic name", nic_name)
        isValid(nic_name);
      });
      console.log("filterNics", filterNics)
      // de cada interface valida tomo mac_entries de <nic_value> y ahi dentro busco la mac
      filterNics.map(([nic_name, nic_value]) => {
        const { mac_entires } = nic_value;
        if (mac_entires) {
          mac_entires.map(currentMac => {
            // en caso de encontrarla la agrego a result y switch y en nombre de la nic correspondiente
            if (currentMac.name.toLowerCase().includes(mac.toLowerCase()))
              result.append({
                switch_id: sw.id,
                switch_name: sw.name,
                interface_name: nic_name
              });
          });
        }
      });
    });
    console.log(`Loop time: ${startTime.getTime() - new Date().getTime()}...`)
    return dispatch({ type: `@${ENTITY}/POST_SUCCESS`, payload: result });
  }

  dispatch({
    type: `@${ENTITY}/POST_ERROR`,
    payload: new Error('No `items` key found on response')
  });
};

function isValid(nic) {
  const name = get(nic, 'name', '').toLowerCase();
  return (
    !DISALLOWED_INTERFACES.includes(name) &&
    !name.includes('vlan') &&
    !name.includes('port-channel') &&
    !name.includes('cpu')
  );
}

const cancelFindByMacAwxTasks = ({ switchesToFindIds }) => async (dispatch) => {
  dispatch({ type: `@${ENTITY}/CANCEL_TASKS_POST_REQUEST`, payload: {} });
  try {
    await updateToken();
    var resp = await axios.post(
      `/api/macs/cancel_find_tasks`,
      { switchesToFindIds },
      {
        headers: { Token: getToken(), 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return dispatch({
      type: `@${ENTITY}/CANCEL_TASKS_POST_ERROR`,
      payload: error
    });
  }
  if (resp.status === 201)
    return dispatch({
      type: `@${ENTITY}/CANCEL_TASKS_POST_SUCCESS`,
      payload: {}
    });

  dispatch({
    type: `@${ENTITY}/CANCEL_TASKS_POST_ERROR`,
    payload: new Error("Respose status code isn't equal to 201")
  });
};
