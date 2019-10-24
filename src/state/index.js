import { 
  createStore, 
  applyMiddleware,
  compose
} from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './reducers.js';
import rootEpic from './epics.js';
import { loggerMiddleware } from './middleware';
import { monitorEnhancer } from './enhancers';

export function configureStore() {
  const epicMiddleware = createEpicMiddleware();
  const middlewareEnhancer = applyMiddleware(epicMiddleware, loggerMiddleware);
  const composedEnhancers = compose(middlewareEnhancer, monitorEnhancer);

  const store = createStore(rootReducer, undefined, composedEnhancers);
  
  epicMiddleware.run(rootEpic);

  return store;
}

export default configureStore;