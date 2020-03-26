import axios from 'axios';
import { normalize } from 'normalizr';

import { getToken } from './index.js';

var REST_DEFAULT_CONFIG = {
  endpoint: '/',
  parseItem: item => [item],
  parseItems: items => items,
  requestPayload: undefined,
}

export default function Rest(config) {
  config = {...REST_DEFAULT_CONFIG, ...config}
  var { entity, endpoint, schema } = config;

  var requestParams = () => ({ headers: { Token: getToken(), 'Content-Type': 'application/json' } });
  
  var create = (payload={}, options={}) => async (dispatch) => {
    var { parseItem, requestPayload } = {...config, ...options};
    dispatch({ type: `@${entity}/POST_REQUEST`, payload: requestPayload});

    try {
      var { data: { item } } = await axios.post(endpoint, payload, requestParams());
    } catch (error) {
      console.error(error);
      return dispatch({ type: `@${entity}/POST_ERROR`, payload: error });
    }

    if (item !== undefined) {
      console.log(item);
      return dispatch({ type: `@${entity}/POST_SUCCESS`, payload: normalize(parseItem(item), [schema]) });
    }
    
    dispatch({ type: `@${entity}/POST_SUCCESS` });
  }

  var read = (id, options={}) => async (dispatch) => {
    var { parseItem, parseItems, requestPayload } = {...config, ...options};
    dispatch({ type: `@${entity}/GET_REQUEST`, payload: requestPayload });
    
    try {
      var { data: { items, item } } = await axios.get(id !== undefined ? `${endpoint}${id}` : endpoint, requestParams());
    } catch (error) {
      console.error(error);
      return dispatch({ type: `@${entity}/GET_ERROR`, payload: error });
    }

    if (items !== undefined) 
      return dispatch({ type: `@${entity}/GET_SUCCESS`, payload: normalize(parseItems(items), [schema]) });
    if (item !== undefined)
      return dispatch({ type: `@${entity}/GET_SUCCESS`, payload: normalize(parseItem(item), [schema]) });
    
    dispatch({ type: `@${entity}/GET_ERROR`, payload: new Error('No `item` or `items` key found on response') });
  }

  var update = (payload, options={}) => async (dispatch) => {
    var { parseItem, requestPayload } = {...config, ...options};
    dispatch({ type: `@${entity}/PUT_REQUEST`, payload: requestPayload });
    var { id } = payload;

    if (id === undefined) 
      return dispatch({ type: `@${entity}/PUT_ERROR`, payload: new Error('id is undefined') });

    try {
      var { data: { item } } = await axios.put(`${endpoint}${id}`, payload, requestParams());
    } catch (error) {
      return dispatch({ type: `@${entity}/PUT_ERROR`, payload: error });
    }

    if (item !== undefined)
      return dispatch({ type: `@${entity}/PUT_SUCCESS`, payload: normalize(parseItem(item), [schema]) });

    dispatch({ type: `@${entity}/PUT_SUCCESS` });
  }
  
  var destroy = (id, options={}) => async (dispatch) => {
    var { requestPayload } = {...config, ...options};
    dispatch({ type: `@${entity}/DELETE_REQUEST`, payload: requestPayload });

    try {
      await axios.get(`${endpoint}/${id}`, requestParams());
    } catch (error) {
      console.error(error);
      return dispatch({ type: `@${entity}/DELETE_ERROR`, payload: error });
    }

    dispatch({ type: `@${entity}/DELETE_SUCCESS` });
  }

  return {create, read, update, destroy};
}