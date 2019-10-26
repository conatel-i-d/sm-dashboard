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

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export function configureStore() {
  const epicMiddleware = createEpicMiddleware();
  const middlewareEnhancer = applyMiddleware(epicMiddleware, loggerMiddleware);
  const composedEnhancers = composeEnhancers(middlewareEnhancer, monitorEnhancer);

  const store = createStore(rootReducer, undefined, composedEnhancers);
  
  epicMiddleware.run(rootEpic);

  return store;
}

export default configureStore;