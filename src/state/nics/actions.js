import { actionCreator, updateToken } from '../utils';
import axios from 'axios';
import { getToken } from '../utils';
import Rest from '../utils/rest.js';
import { schema } from 'normalizr';

import { addAlert } from '../alerts';
const ENTITY = 'nics';
const nicsSchema = new schema.Entity(ENTITY);

export const DISALLOWED_INTERFACES = [
  '',
  'failed',
  'changed',
  'vlan',
  'port-channel'
];

export const updateSortBy = actionCreator(`@${ENTITY}/UPDATE_SORT_BY`);
export const updateFilterInput = actionCreator(
  `@${ENTITY}/UPDATE_FILTER_INPUT`
);

var rest = Rest({
  entity: ENTITY,
  endpoint: '/api/switch/',
  schema: nicsSchema
});

export const get = (switchId, foundInterface) =>
  rest.read(`${switchId}/nics`, {
    requestPayload: { switchId },
    parseItem: parseItemFactory(switchId, foundInterface)
  });

function parseItemFactory(switchId, foundInterface) {
  return function (state) {
    return Object.values(state)
    // filtro nombre valido y si foundInterfce esta definido tambien por foundInterface
      .filter((item) => isValid(item.name) && item.name === (foundInterface || item.name))
      .map((item) => {
        item.id = `${switchId}__${item.name}`;

        if (
          item.protocol === undefined &&
          item.operationalStatus !== undefined
        ) {
          item.protocol = item.operationalStatus.toLowerCase();
          delete item.operationalStatus;
        } else {
          item.protocol = item.protocol ? item.protocol.toLowerCase() : undefined;
        }

        if (item.adminisrtative_mode === undefined) {
          if (
            (item.description || '').toLowerCase().includes('trunk') ||
            (item.desiredVlanMode || '').toLowerCase().includes('trunk') ||
            (item.operationalVlanMode || '').toLowerCase().includes('trunk') ||
            item.trunkingEncapsulationNegotiation === true
          )
            item.adminisrtative_mode = 'trunk';
          else item.adminisrtative_mode = 'acess';
        } else {
          item.adminisrtative_mode = item.adminisrtative_mode.toLowerCase();
        }

        item =
          item.mac_entries !== undefined
            ? {
                ...item,
                mac_entries: item.mac_entries
                  .map((mac) => mac.mac_address)
                  .join(',')
              }
            : item;
        return item;
      });
  };
}

export function isValid(name) {
  if (name) {
    const lowerName = name.trim().toLowerCase();
    return (
      !DISALLOWED_INTERFACES.includes(lowerName) &&
      !lowerName.includes('vlan') &&
      !lowerName.includes('port-channel') &&
      !lowerName.includes('cpu') 
    );
  } else return false;
}

export const rebootSuccess = actionCreator(`@${ENTITY}/REBOOT_REQUEST_SUCCESS`);
export const rebootError = actionCreator(`@${ENTITY}/REBOOT_REQUEST_ERROR`);
export const reboot = ({ switchId, name }) => async (dispatch) => {
  dispatch({ type: `@${ENTITY}/REBOOT_REQUEST` });
  try {
    await updateToken();
    var response = await axios.post(
      `/api/switch/${switchId}/nics/reset?nic_name=${name}`,
      {},
      {
        headers: { Token: getToken(), 'Content-Type': 'application/json' }
      }
    );
  } catch (err) {
    dispatch(
      addAlert({
        type: 'danger',
        title: `Error al resetear la NIC ${name}`,
        description: `Error: ${err.message}`
      })
    );
    return dispatch(rebootError());
  }
  if (response.status !== 200) {
    dispatch(
      addAlert({
        type: 'danger',
        title: `Error al resetear la NIC ${name}`,
        description: `Status code de la respuesta incorrecto:\n Deseado: 200\n Recibido ${response.status}`
      })
    );
    return dispatch(rebootError());
  } else {
    dispatch(
      addAlert({
        type: 'success',
        title: `La NIC ${name} se reseteo correctamente`
      })
    );
    return dispatch(rebootSuccess());
  }
};
