import { combineEpics } from 'redux-observable';

import { epics as switchesEpics } from './switches';
import { epics as nicsEpics } from './nics';
import { epics as uiEpics } from './ui'

export const rootEpic = combineEpics(uiEpics, switchesEpics, nicsEpics);

export default rootEpic;