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
  [`@${ENTITY}/GET_SUCCESS`]: updateIds,
  [`@${ENTITY}/POST_REQUEST`]: updateIds,
  [`@${ENTITY}/PUT_REQUEST`]: updateIds,
  [`@${ENTITY}/DELETE_REQUEST`]: removeId,
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

export function selectModel(state) {
  return { model: getModel(state) };
}

const defaultState = {
  name: '',
  description: '',
  model: '',
  ip: '',
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
