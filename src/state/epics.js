import { combineEpics } from 'redux-observable';

import { switchesEpics } from './switches';
import { uiEpics } from './ui'

export const rootEpic = combineEpics(uiEpics, switchesEpics);

export default rootEpic;