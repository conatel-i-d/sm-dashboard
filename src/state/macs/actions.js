import axios from 'axios';
import { getToken, updateToken } from '../utils';

import { isValid } from '../nics';
import { addAlert } from '../alerts';

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
  } catch (err) {
    console.error(err);
    if (axios.isCancel(err)) {
      dispatch(
        cancelFindByMacAwxTasks({ switchesToFindIds, errorType: 'cancel' })
      );
      dispatch(addAlert({ type: "warning", title: `Se ha cancelado la busqueda por mac para ${mac}`}))
      return dispatch({ type: `@${ENTITY}/POST_CANCELED`, payload: err });
    }
    dispatch(
      cancelFindByMacAwxTasks({ switchesToFindIds, errorType: 'error' })
    );
    dispatch(addAlert({type: "danger", message: `Error al buscar por mac`, description: `Error: ${err.message}`}))
    return dispatch({ type: `@${ENTITY}/POST_ERROR`, payload: err });
  }

  if (items !== undefined) {
    let result = [];
    items.map((sw) => {
      // por cada sw, me filtro las interfces validas y las retorno como [[<nic_name>, <nic_value>]]
      const filterNics = Object.entries(sw.interfaces).filter(([nic_name]) =>
        isValid(nic_name)
      );
      console.log("filterNics", filterNics);
      filterNics.map(([nic_name, nic_value]) => {
        const { mac_entries } = nic_value;
        if (mac_entries) {
          mac_entries.map((currentMac) => {
            // en caso de encontrar la `mac` ingresada o en el caso de que no se halla ingresado
            // ninguna mac, si la interface/switch no existia en result, la agrego
            if (currentMac.mac_address
                  .toLowerCase()
                  .includes(mac?.toLowerCase()) &&
              (result.every(
                  ({ switch_name, interface_name }) =>
                    switch_name !== sw.name && interface_name !== nic_name
                )) 
            )
            console.log(`en la nic ${nic_name} se inserta: `, currentMac);
            result.push({
                switch_id: sw.id,
                switch_name: sw.name,
                interface_name: nic_name
              });
            return true;
          });
        }
        return true;
      });
      return false;
    });
    return dispatch({ type: `@${ENTITY}/POST_SUCCESS`, payload: result });
  }

  dispatch({
    type: `@${ENTITY}/POST_ERROR`,
    payload: new Error('No `items` key found on response')
  });
};

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
