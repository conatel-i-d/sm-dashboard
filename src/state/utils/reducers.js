import isFunction from 'lodash/isFunction';

import { updateObject } from '.';
/**
 * Combina el resultado de multiples stateSelectors en un único objeto.
 * @param  {function[]} stateSelectors Lista de funciones que seleccionan información del state 
 */
export function combineStateSelectors(...stateSelectors) {
  return function(state, props) {
    const result = stateSelectors.reduce(function(accumulator, selector){
      return {...accumulator, ...selector(state, props)};
    }, {});
    return result;
  }
}
/**
 * Helper function to handle special state transformations
 * @param {string} key Name of the state key to update
 * @param {function} stateTransform Transform function to update the state
 */
export function updateState(key, stateTransform) {
  return function (state, payload) {
    return updateObject(state, {
      [key]: isFunction(stateTransform) 
        ? stateTransform(state, payload) 
        : payload 
    });
  };
}