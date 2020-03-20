import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers.js';

import thunk from 'redux-thunk';

const composeEnhancers =
  (typeof window !== 'undefined' &&
<<<<<<< HEAD
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
=======
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
>>>>>>> c3e503faf1d09de8328d54682c404544a3ba48af
  compose;

export function configureStore() {
  const middlewareEnhancer = applyMiddleware(thunk);
  const composedEnhancers = composeEnhancers(
    middlewareEnhancer,
  );

  const store = createStore(rootReducer, undefined, composedEnhancers);

  return store;
}

export default configureStore;
