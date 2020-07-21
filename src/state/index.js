import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers.js';

import thunk from 'redux-thunk';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose));

export function configureStore() {
  const middlewareEnhancer = applyMiddleware(thunk);
  const composedEnhancers = composeEnhancers(
    middlewareEnhancer,
  );

  const store = createStore(rootReducer, undefined, composedEnhancers);

  return store;
}

export default configureStore;
