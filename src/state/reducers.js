import { combineReducers } from 'redux';

import { reducer as uiReducer } from './ui';
import { reducer as switchesReducer } from './switches';
import { reducer as entitiesReducer } from './entities';
import { reducer as nicsReducer } from './nics';
import { reducer as logsReducer } from './logs';

export const rootReducer = combineReducers({
  entities: entitiesReducer,
  nics: nicsReducer,
  switches: switchesReducer,
  logs: logsReducer,
  ui: uiReducer
});

export default rootReducer;
