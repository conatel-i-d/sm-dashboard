import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers.js';

import { loggerMiddleware } from './middleware';
import { monitorEnhancer } from './enhancers';
import thunk from 'redux-thunk';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25
    })) ||
  compose;

export function configureStore() {
  const middlewareEnhancer = applyMiddleware(thunk, loggerMiddleware);
  const composedEnhancers = composeEnhancers(
    middlewareEnhancer,
    monitorEnhancer
  );

  const store = createStore(rootReducer, undefined, composedEnhancers);

  return store;
}

export default configureStore;
