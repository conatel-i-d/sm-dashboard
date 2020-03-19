import { actionCreator } from '../utils';
import axios from 'axios'
import { getToken } from '../utils'
import getter from 'lodash/get'
import Rest from '../utils/rest.js';
import { schema } from 'normalizr';

const ENTITY = 'nics';
const nicsSchema = new schema.Entity(ENTITY);

const DISALLOWED_INTERFACES = ['', 'failed', 'changed', 'vlan', 'port-channel'];

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

export const reboot = ({ switchId, name }) => async dispatch => {
  await axios.post(`/api/switch/${switchId}/nics/reset?nic_name=${name}`, {}, {
    headers: { Token: getToken(), 'Content-Type': 'application/json' }
  });
  return dispatch({ type: `@${ENTITY}/REBOOT_REQUEST` });
};
