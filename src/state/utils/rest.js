import axios from 'axios';
import { normalize } from 'normalizr';

import { getToken } from './index.js';

var REST_DEFAULT_CONFIG = {
  endpoint: '/',
}

export default function Rest(config) {
  var { entity, endpoint, schema } = {...REST_DEFAULT_CONFIG, ...config};

  var options = () => ({ headers: { Token: getToken(), 'Content-Type': 'application/json' } });
  
  var create = (payload={}) => async (dispatch) => {
    dispatch({ type: `@${entity}/POST_REQUEST` });

    try {
      var { data } = await axios.post(endpoint, payload, options());
    } catch (error) {
      console.error(error);
      return dispatch({ type: `@${entity}/POST_ERROR`, payload: error });
    }

    if (data !== undefined) 
      return dispatch({ type: `@${entity}/POST_SUCCESS`, payload: normalize([data], [schema]) });
    
    dispatch({ type: `@${entity}/POST_SUCCESS` });
  }

  var read = (id) => async (dispatch) => {
    dispatch({ type: `@${entity}/GET_REQUEST` });
    
    try {
      console.log(id, id !== undefined ? `${endpoint}/${id}` : endpoint);
      var { data: { items, item } } = await axios.get(id !== undefined ? `${endpoint}/${id}` : endpoint, options());
    } catch (error) {
      console.error(error);
      return dispatch({ type: `@${entity}/GET_ERROR`, payload: error });
    }
    
    if (items !== undefined) 
      return dispatch({ type: `@${entity}/GET_SUCCESS`, payload: normalize(items, [schema]) });
    if (item !== undefined)
      return dispatch({ type: `@${entity}/GET_SUCCESS`, payload: normalize([item], [schema]) });
    
    dispatch({ type: `@${entity}/GET_ERROR`, payload: new Error('No `item` or `items` key found on response') });
  }

  var update = (id, payload) => async (dispatch) => {
    dispatch({ type: `@${entity}/PUT_REQUEST` });

    try {
      var { data: { item } } = await axios.put(`${endpoint}/${id}`, payload, options());
    } catch (error) {
      console.error(error);
      return dispatch({ type: `@${entity}/PUT_ERROR`, payload: error });
    }

    if (item !== undefined)
      return dispatch({ type: `@${entity}/PUT_SUCCESS`, payload: normalize([item], [schema]) });

    dispatch({ type: `@${entity}/PUT_SUCCESS` });
  }
  
  var destroy = (id) => async (dispatch) => {
    dispatch({ type: `@${entity}/DELETE_REQUEST` });

    try {
      await axios.get(`${endpoint}/${id}`, options());
    } catch (error) {
      console.error(error);
      return dispatch({ type: `@${entity}/DELETE_ERROR`, payload: error });
    }

    dispatch({ type: `@${entity}/DELETE_SUCCESS` });
  }

  return {create, read, update, destroy};
}