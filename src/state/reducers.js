import { combineReducers } from 'redux';

import { uiReducer } from './ui'
import { beersReducer } from './beers';
import { todosReducer } from './todos';
import { entitiesReducer } from './entities';

export const rootReducer = combineReducers({
  ui: uiReducer,
  beers: beersReducer,
  todos: todosReducer,
  entities: entitiesReducer
});

export default rootReducer;

