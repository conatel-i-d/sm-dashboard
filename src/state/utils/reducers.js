import isFunction from 'lodash/isFunction';
import { SortByDirection } from '@patternfly/react-table';
import lodashSortBy from 'lodash/sortBy';
import Fuse from 'fuse.js';

import { updateObject } from '.';
/**
 * Combina el resultado de multiples stateSelectors en un único objeto.
 * @param  {function[]} stateSelectors Lista de funciones que seleccionan información del state
 */
export function combineStateSelectors(...stateSelectors) {
  return function(state, props) {
    const result = stateSelectors.reduce(function(accumulator, selector) {
      return { ...accumulator, ...selector(state, props) };
    }, {});
    return result;
  };
}
/**
 * Helper function to handle special state transformations
 * @param {string} key Name of the state key to update
 * @param {function} stateTransform Transform function to update the state
 */
export function updateState(key, stateTransform) {
  return function(state, payload) {
    return updateObject(state, {
      [key]: isFunction(stateTransform)
        ? stateTransform(state, payload)
        : payload
    });
  };
}

export function actionCreator(type) {
  return function(...payload) {
    return { type, payload: payload.length > 1 ? payload : payload[0] };
  };
}

export function filterItems(items, filterInput, options) {
  const fuse = new Fuse(items, options);
  return fuse.search(filterInput);
}

export function sortItems(items, sortBy = {}) {
  if (sortBy.key === undefined || sortBy.direction === undefined) return items;
  const { key, direction } = sortBy;
  items = lodashSortBy(items, key);
  return direction === SortByDirection.asc ? items : items.reverse();
}
