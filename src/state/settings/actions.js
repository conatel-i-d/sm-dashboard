const ENTITY = 'settings';

export var getSettings = () => (dispatch) => {
  dispatch({ type: `@${ENTITY}/GET_REQUEST` });
  window.setTimeout(() => dispatch({ type: `@${ENTITY}/GET_SUCCESS` }), 3000);
}

export var saveSettings = () => (dispatch) => {
  dispatch({ type: `@${ENTITY}/PUT_REQUEST` });
  window.setTimeout(() => dispatch({ type: `@${ENTITY}/PUT_SUCCESS` }), 3000);
}