import { combineEpics } from 'redux-observable';
import { epics as switchesEpics } from './switches';
import { epics as nicsEpics } from './nics';
import { epics as uiEpics } from './ui';
import { epics as logsEpics } from './logs';

export const rootEpic = combineEpics(
  uiEpics,
  switchesEpics,
  nicsEpics,
  logsEpics,
  alertsEpics
);

export default rootEpic;
