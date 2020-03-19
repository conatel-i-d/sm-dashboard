import { combineReducers } from 'redux';

import { reducer as uiReducer } from './ui';
import { reducer as switchesReducer } from './switches';
import { reducer as entitiesReducer } from './entities';
import { reducer as nicsReducer } from './nics';
import { reducer as logsReducer } from './logs';
import { reducer as settingsReducer } from './settings';

export const rootReducer = combineReducers({
  entities: entitiesReducer,
  nics: nicsReducer,
  switches: switchesReducer,
  logs: logsReducer,
  ui: uiReducer,
  settings: settingsReducer,
});

export default rootReducer;
