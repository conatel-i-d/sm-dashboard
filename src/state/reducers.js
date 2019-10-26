import { combineReducers } from 'redux';

import { reducer as uiReducer } from './ui'
import { reducer as switchesReducer } from './switches';
import { reducer as entitiesReducer } from './entities';

export const rootReducer = combineReducers({
  ui: uiReducer,
  switches: switchesReducer,
  entities: entitiesReducer
});

export default rootReducer;

