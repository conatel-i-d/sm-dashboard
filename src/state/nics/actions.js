import { actionCreator, updateToken } from '../utils';
import axios from 'axios'
import { getToken } from '../utils'
import getter from 'lodash/get'
import Rest from '../utils/rest.js';
import { schema } from 'normalizr';

import { addAlert } from '../alerts'
const ENTITY = 'nics';
const nicsSchema = new schema.Entity(ENTITY);

export const DISALLOWED_INTERFACES = ['', 'failed', 'changed', 'vlan', 'port-channel'];

export const updateSortBy = actionCreator(`@${ENTITY}/UPDATE_SORT_BY`);
export const updateFilterInput = actionCreator(
  `@${ENTITY}/UPDATE_FILTER_INPUT`
);

var rest = Rest({
  entity: ENTITY,
  endpoint: '/api/switch/',
  schema: nicsSchema,
});

export const get = (switchId) => rest.read(`${switchId}/nics`, {
  requestPayload: { switchId },
  parseItem: parseItemFactory(switchId) 
});

function parseItemFactory(switchId) {
  return function (item) {
    return Object.values(item).filter(isValid).map(item => {
      item.id = `${switchId}__${item.name}`;
      item =
        item.mac_entries !== undefined
          ? {
              ...item,
              mac_entries: item.mac_entries
                .map(mac => mac.mac_address)
                .join(',')
            }
          : item
          return item;
          })
    };
  }

function isValid(nic) {
  const name = getter(nic, 'name', '').toLowerCase();
  return (
    DISALLOWED_INTERFACES.indexOf(name) === -1 &&
    name.search('vlan') < 0 &&
    name.search('port-channel') < 0
  );
}

export const rebootSuccess = actionCreator(`@${ENTITY}/REBOOT_REQUEST_SUCCESS`);
export const rebootError = actionCreator(`@${ENTITY}/REBOOT_REQUEST_ERROR`);
export const reboot = ({ switchId, name }) => async dispatch => {
  dispatch({ type: `@${ENTITY}/REBOOT_REQUEST` });
  await updateToken();
  try {
    var response = await axios.post(`/api/switch/${switchId}/nics/reset?nic_name=${name}`, {}, {
      headers: { Token: getToken(), 'Content-Type': 'application/json' }
    });
  } catch (error) {
    dispatch(rebootError())
    return dispatch(addAlert({ type: 'danger', title: `Error al resetear la NIC ${name}` }))
  }
  if (response.status !== 200) {
    dispatch(rebootError())
    return dispatch(addAlert({ type: 'danger', title: "Error al resetear mac" }))  
  } else {
    dispatch(rebootSuccess())
    return dispatch(addAlert({ type: 'success', title: `La NIC ${name} se reseteo correctamente` }))
  }
};
