const ENTITY = 'switches';

function actionCreator(type) {
  return function (...payload) {
    return { type, payload: payload.length > 1 ? payload : payload[0] };
  };
}

export const getAll = actionCreator(`@${ENTITY}/GET_REQUEST`);
export const create = actionCreator(`@${ENTITY}/POST_REQUEST`);
export const edit = actionCreator(`@${ENTITY}/PUT_REQUEST`);
export const destroy = actionCreator(`@${ENTITY}/DELETE_REQUEST`);
export const updateFilterInput = actionCreator(`@${ENTITY}/UPDATE_FILTER_INPUT`);
export const updateSortBy = actionCreator(`@${ENTITY}/UPDATE_SORT_BY`);