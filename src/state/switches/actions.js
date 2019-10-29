const ENTITY = 'switches';

function actionCreator(type) {
  return function (payload) {
    return { type, payload };
  };
}

export const getAll = actionCreator(`@${ENTITY}/GET_REQUEST`);
export const create = actionCreator(`@${ENTITY}/POST_REQUEST`);
export const toggleModal = actionCreator(`@${ENTITY}/TOGGLE_MODAL`);
export const updateFilterInput = actionCreator(`@${ENTITY}/UPDATE_FILTER_INPUT`);
export const updateSortBy = actionCreator(`@${ENTITY}/UPDATE_SORT_BY`);
