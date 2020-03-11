import { actionCreator } from '../utils';
import axios from 'axios'
import { getToken } from '../utils'
const ENTITY = 'nics';

const API = switchId => `/api/switch/${switchId}/nics`;
const DISALLOWED_INTERFACES = ['', 'failed', 'changed'];

const resetUrl = (switchId, name) =>
  `/api/switch/${switchId}/nics/reset?nic_name=${name}`;

export const updateSortBy = actionCreator(`@${ENTITY}/UPDATE_SORT_BY`);
export const updateFilterInput = actionCreator(
  `@${ENTITY}/UPDATE_FILTER_INPUT`
);

const loading = () => ({
  type: `@${ENTITY}/LOADING`
});

export const get = ({ switchId }) => {
  return async dispatch => {
    dispatch(loading);
    const axRes = await axios.get(API(switchId), {
      headers: { Token: getToken(), 'Content-Type': 'application/json' }
    });
    const response = axRes.data;
    const result = response.items
      ? response.items
      : [ response.item ]
    console.log('getNicsResponse', response);
    const payload = {
      entities: {
        switches: {
          [switchId]: { nics: Object.values(result).filter(isValid) }
        }
      },
      result: [switchId]
    };
    return dispatch({
      type: `@${ENTITY}/GET_REQUEST`,
      payload
    });
  };
};

function isValid(nic) {
  const name = get(nic, 'name', '').toLowerCase();
  return (
    DISALLOWED_INTERFACES.indexOf(name) === -1 &&
    name.search('vlan') < 0 &&
    name.search('port-channel') < 0
  );
}

export const reboot = ({ switchId, name }) => {
  return async dispatch => {
    const axRes = await axios.post(resetUrl(switchId, name), payload, {
      headers: { Token: getToken(), 'Content-Type': 'application/json' }
    });
    const payload = axRes.data;
    console.log("reboot result", payload);
    return { type: `@${ENTITY}/REBOOT_REQUEST`, payload };
  };
};
