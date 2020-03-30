import get from 'lodash/get';

import {
  createReducer,
  updateObject,
  updateState,
  sortItems,
  filterItems,
  updateIds
} from '../utils';

const ENTITY = 'switches';

export const initialState = {
  ids: [],
  loading: false,
  sortBy: {
    index: 0,
    key: 'id',
    direction: 'asc'
  }
};

export const reducer = createReducer(initialState, {
  [`@${ENTITY}/GET_REQUEST`]: updateState(`loading`, () => true),
  [`@${ENTITY}/GET_SUCCESS`]: updateIds,
  [`@${ENTITY}/POST_SUCCESS`]: updateIds,
  [`@${ENTITY}/PUT_SUCCESS`]: updateIds,
  [`@${ENTITY}/DELETE_SUCCESS`]: removeId,
  [`@${ENTITY}/UPDATE_FILTER_INPUT`]: updateState('filterInput'),
  [`@${ENTITY}/UPDATE_SORT_BY`]: updateState('sortBy')
});

function removeId(state, payload) {
  return updateObject(state, {
    loading: false,
    ids: state.ids.filter(id => id !== payload)
  });
}

export default reducer;

export function selectOne(state, props) {
  const id = get(props, 'match.params.id', undefined);
  const collection = get(state, `entities.${ENTITY}`, {});

  if (id === undefined) return {};

  return {
    item: collection[id]
  };
}

const FUSE_OPTIONS = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['name', 'description', 'model', 'ip']
};

export function selectAll(state) {
  const ids = get(state, `${ENTITY}.ids`, []);
  const collection = get(state, `entities.${ENTITY}`, {});
  const filterInput = get(state, `${ENTITY}.filterInput`, '');
  const sortBy = get(state, `${ENTITY}.sortBy`, '');
  let items = ids.map(id => collection[id]).filter(item => item !== undefined);
  if (filterInput !== '') {
    items = filterItems(items, filterInput, FUSE_OPTIONS);
  } else {
    items = sortItems(items, sortBy);
  }
  return { items };
}

export function selectAllAsTree(state) {
  const ids = get(state, `${ENTITY}.ids`, []);
  const collection = get(state, `entities.${ENTITY}`, {});
  const filterInput = get(state, `${ENTITY}.filterInput`, '');
  const sortBy = get(state, `${ENTITY}.sortBy`, '');
  let items = ids.map(id => ({ id, ...collection[id]})).filter(item => item !== undefined);
  if (filterInput !== '') {
    items = filterItems(items, filterInput, FUSE_OPTIONS);
  } else {
    items = sortItems(items, sortBy);
  }

  const buildings = {};
  for (let item of items) {
    const splitName = item.name.split("_");
    const buildingName = isNaN(splitName[1]) ? splitName[1] : splitName[2].split(".")[0];
    if (!(buildingName in buildings)) buildings[buildingName] = {
      type: 'branch',
      name: buildingName,
      branches: []
    }
    buildings[buildingName].branches.push({
        type: 'leaf',
        value: item
      }); 
  }
  const result = Object.values(buildings); 
  return result.length > 0 ? result : {
    type: 'branch',
    name: 'CTMSG',
    branches: []
  }
}

export function selectModel(state) {
  return { model: getModel(state) };
}

const defaultState = {
  name: '',
  description: '',
  model: '',
  ip: '',
  ansible_user: '',
  ansible_ssh_pass: '',
  ansible_ssh_port: 22,
  nics: []
};

const EXISTING_SWITCH_REG_EXP = new RegExp(`/${ENTITY}[/|a-zA-Z]+([0-9]+)`);

export function getModel(state) {
  const pathname = get(state, 'ui.history.pathname');
  const existingSwitch = pathname.match(EXISTING_SWITCH_REG_EXP);
  if (existingSwitch) {
    const switchId = existingSwitch[1];
    const model = get(state, `entities.${ENTITY}.${switchId}`, {
      ...defaultState,
      id: switchId
    });
    return model;
  }
  return { ...defaultState };
}
