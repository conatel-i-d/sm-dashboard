import { actionCreator } from '../utils';
import axios from 'axios';
import { getToken } from '../utils';
import _ from 'lodash';

const ENTITY = 'nics';

const DISALLOWED_INTERFACES = ['', 'failed', 'changed'];

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
    const url = `/api/switch/${switchId}/nics`;
    const axRes = await axios.get(url, {
      headers: { Token: getToken(), 'Content-Type': 'application/json' }
    });
    const response = axRes.data;
    const result = response.items ? response.items : response.item;
    const payload = {
      entities: {
        switches: {
          [switchId]: {
            nics: Object.values(result)
              .filter(isValid)
              .map(nic =>
                nic.mac_entries !== undefined
                  ? {
                      ...nic,
                      mac_entries: nic.mac_entries
                        .map(mac => mac.mac_address)
                        .join(',')
                    }
                  : nic
              )
          }
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
  const name = _.get(nic, 'name', '').toLowerCase();
  return (
    DISALLOWED_INTERFACES.indexOf(name) === -1 &&
    name.search('vlan') < 0 &&
    name.search('port-channel') < 0
  );
}

export const reboot = ({ switchId, name }) => {
  return async dispatch => {
    const axRes = await axios.post(
      `/api/switch/${switchId}/nics/reset?nic_name=${name}`,
      {},
      {
        headers: { Token: getToken(), 'Content-Type': 'application/json' }
      }
    );
    const payload = axRes.data;
    return dispatch({ type: `@${ENTITY}/REBOOT_REQUEST` });
  };
};
