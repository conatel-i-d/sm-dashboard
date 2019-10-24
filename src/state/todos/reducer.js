import { combineReducers } from 'redux';

import { updateObject, updateItemInArray, appendItemInArray, createReducer } from '../utils';
import {
  ADD_TODO,
  EDIT_TODO,
  SET_VISIBILITY_FILTER,
  TOGGLE_TODO
} from './actions';

export const visibilityReducer = createReducer('SHOW_ALL', {
  [SET_VISIBILITY_FILTER]: setVisivityFilter
});

export const todosReducer = createReducer([], {
  [ADD_TODO]: addTodo,
  [EDIT_TODO]: editTodo,
  [TOGGLE_TODO]: toggleTodo,
});

export const reducer = combineReducers({
  visibilityFilter: visibilityReducer,
  todos: todosReducer
})

export default reducer;

/** CASE REDUCERS **/

function setVisivityFilter(state, payload) {
  return payload;
}

function addTodo(state, payload) {
  return appendItemInArray(state, payload);
}

function editTodo(state, payload) {
  return updateItemInArray(state, payload.id, todo => (
    updateObject(todo, payload)
  ));
}

function toggleTodo(state, payload) {
  return updateItemInArray(state, payload.id, todo => (
    updateObject(todo, { completed: !todo.completed })
  ));
}