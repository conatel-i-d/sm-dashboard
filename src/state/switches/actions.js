const entity = 'switches';

export function getAll() {
  return {
    type: `@${entity}/GET_REQUEST`,
  };
}

export function create(payload) {
  return {
    type: `@${entity}/POST_REQUEST`,
    payload
  };
}

export function toggleModal() {
  return {
    type: `@${entity}/TOGGLE_MODAL`,
  };
}

export function updateFilterInput(payload) {
  return {
    type: `@${entity}/UPDATE_FILTER_INPUT`,
    payload
  }
}