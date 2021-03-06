import axios from 'axios';
import { normalize } from 'normalizr';

import { getToken, updateToken } from './index.js';
import { addAlert } from '../alerts/index.js';

var REST_DEFAULT_CONFIG = {
  endpoint: '/',
  parseItem: (item) => [item],
  parseItems: (items) => items,
  requestPayload: undefined
};

export default function Rest(config) {
  config = { ...REST_DEFAULT_CONFIG, ...config };
  var { entity, endpoint, schema } = config;

  var requestParams = () => ({
    headers: {
      Token: getToken(),
      'Content-Type': 'application/json',
      timeout: 1000 * 60 * 3
    }
  });

  var create = (payload = {}, options = {}) => async (dispatch) => {
    var { parseItem, requestPayload } = { ...config, ...options };
    dispatch({ type: `@${entity}/POST_REQUEST`, payload: requestPayload });

    try {
      await updateToken();
      var {
        data: { item }
      } = await axios.post(endpoint, payload, requestParams());
    } catch (err) {
      console.error(err);
      dispatch(
        addAlert({
          type: 'danger',
          title: `Error al crear ${entity}`,
          description: `Error: ${err.message}`
        })
      );
      return dispatch({ type: `@${entity}/POST_ERROR`, payload: err });
    }

    if (item !== undefined) {
      return dispatch({
        type: `@${entity}/POST_SUCCESS`,
        payload: normalize(parseItem(item), [schema])
      });
    }

    dispatch({ type: `@${entity}/POST_SUCCESS` });
  };

  var read = (id, options = {}) => async (dispatch) => {
    var { parseItem, parseItems, requestPayload } = { ...config, ...options };
    dispatch({ type: `@${entity}/GET_REQUEST`, payload: requestPayload });

    try {
      await updateToken();
      var {
        data: { items, item }
      } = await axios.get(
        id !== undefined ? `${endpoint}${id}` : endpoint,
        requestParams()
      );
    } catch (err) {
      console.error(err);
      dispatch(
        addAlert({
          type: 'danger',
          title: `Error al cargar ${entity}`,
          description: `Error: ${err.message}`
        })
      );
      return dispatch({ type: `@${entity}/GET_ERROR`, payload: err });
    }

    if (items !== undefined)
      return dispatch({
        type: `@${entity}/GET_SUCCESS`,
        payload: normalize(parseItems(items), [schema])
      });
    if (item !== undefined)
      return dispatch({
        type: `@${entity}/GET_SUCCESS`,
        payload: normalize(parseItem(item), [schema])
      });

    dispatch({
      type: `@${entity}/GET_ERROR`,
      payload: new Error('No `item` or `items` key found on response')
    });
  };

  var update = (payload, options = {}) => async (dispatch) => {
    var { parseItem, requestPayload } = { ...config, ...options };
    dispatch({ type: `@${entity}/PUT_REQUEST`, payload: requestPayload });

    var { id } = payload;

    if (id === undefined)
      return dispatch({
        type: `@${entity}/PUT_ERROR`,
        payload: new Error('id is undefined')
      });

    try {
      await updateToken();
      var {
        data: { item }
      } = await axios.put(`${endpoint}${id}`, payload, requestParams());
    } catch (err) {
      dispatch(
        addAlert({
          type: 'danger',
          title: `Error al actualizar ${entity}`,
          description: `Error: ${err.message}`
        })
      );
      return dispatch({ type: `@${entity}/PUT_ERROR`, payload: err });
    }

    if (item !== undefined)
      return dispatch({
        type: `@${entity}/PUT_SUCCESS`,
        payload: normalize(parseItem(item), [schema])
      });

    dispatch({ type: `@${entity}/PUT_SUCCESS` });
  };

  var destroy = (payload, options = {}) => async (dispatch) => {
    var { id } = payload;

    if (id === undefined)
      return dispatch({
        type: `@${entity}/DELETE_ERROR`,
        payload: new Error('id is undefined')
      });

    var { requestPayload } = { ...config, ...options };
    dispatch({ type: `@${entity}/DELETE_REQUEST`, payload: requestPayload });

    try {
      await updateToken();
      await axios.delete(`${endpoint}${id}`, requestParams());
    } catch (err) {
      console.error(err);
      dispatch(
        addAlert({
          type: 'danger',
          title: `Error al eliminar ${entity}`,
          description: `Error: ${err.message}`
        })
      );
      return dispatch({ type: `@${entity}/DELETE_ERROR`, payload: err });
    }

    dispatch({ type: `@${entity}/DELETE_SUCCESS`, payload: id });
  };

  return { create, read, update, destroy };
}
