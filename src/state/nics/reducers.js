import get from 'lodash/get';
import {
  createReducer,
  updateState,
  sortItems,
  filterItems,
} from '../utils';
const ENTITY = 'nics';

export const initialState = {
  ids: {},
  loading: false,
  switchId: undefined,
  sortBy: {
    index: 0,
    key: 'name',
    direction: 'asc'
  }
};

const FUSE_OPTIONS = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['name', 'description', 'protocol', 'adminisrtative_mode']
};

export const reducer = createReducer(initialState, {
  [`@${ENTITY}/GET_REQUEST`]: updateActiveSwitchId,
  [`@${ENTITY}/GET_SUCCESS`]: updateSwitchNicsIds,
  [`@${ENTITY}/UPDATE_SORT_BY`]: updateState('sortBy'),
  [`@${ENTITY}/UPDATE_FILTER_INPUT`]: updateState('filterInput'),
});

export function updateActiveSwitchId(state, payload) {
  var switchId = get(payload, 'switchId');
  return {
    ...state,
    loading: true,
    switchId
  };
}

export function updateSwitchNicsIds(state, payload) {
  const switchId = get(state, 'switchId');
  var ids = get(state, `ids`, {});
  return {
    ...state,
    loading: false,
    ids: {
      ...ids,
      [switchId]: payload.result
    }
  }
}

export function getLoading(state) {
  var loading = get(state, `${ENTITY}.loading`, false);
  var items = getNics(state);
  return {
    loading: loading && items.length === 0
  };
}

export function getState(state) {
  return {
    sortBy: get(state, `${ENTITY}.sortBy`)
  };
}

export function selectSwitchNicsCount(state) {
  const {items} = selectSwitchNics(state);
  return {count: items.length};
}

export function selectSwitchNics(state) {
  let items = getNics(state);
  const switchId = getSwitchId(state);
  const sortBy = get(state, `${ENTITY}.sortBy`, '');
  const filterInput = get(state, `${ENTITY}.filterInput`, '');
  if (filterInput !== '') {
    items = filterItems(items, filterInput, FUSE_OPTIONS);
  } else {
    items = sortItems(items, sortBy);
  }
  return {
    items,
    switchId
  };
}

function getNics(state) {
  const switchId = getSwitchId(state);
  const ids = get(state, `${ENTITY}.ids.${switchId}`, []);
  const collection = get(state, `entities.${ENTITY}`, {});
  return ids.map(id => collection[id]).filter(item => item !== undefined);
}

function getSwitchId(state) {
  const pathname = get(state, 'ui.history.pathname', '');
  return pathname.replace(`/switches/`, '');
}
