import { combineEpics } from 'redux-observable';
import get from 'lodash/get';

import { rest$ } from '../utils';

const DISALLOWED_INTERFACES = ['', 'failed', 'changed']

export const restEpic = rest$({
  url,
  prefix: 'nics',
  parseResponse: ({ item }, _, { switchId }) => {
    return {
      entities: {
        switches: {
          [ switchId ]: { nics: Object.values(item).filter(isValid) }
        },
      },
      result: [ switchId ]
    };
  }
});

export const epics = combineEpics(...restEpic);

function url(_, { switchId }) {
  return `/api/switch/${ switchId }/nics`;
}

function isValid(nic) {
  const name = get(nic, 'name', '').toLowerCase();
  return DISALLOWED_INTERFACES.indexOf(name) === -1 
    && name.search('vlan') < 0
    && name.search('port-channel') < 0
}