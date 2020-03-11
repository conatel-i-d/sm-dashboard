import React from 'react';
import ReactDOM from 'react-dom';

import '@patternfly/react-core/dist/styles/base.css';
import 'react-virtualized/styles.css'
import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore from './state';
import Root from './pages/Root.js';
import { init } from './modules/keycloak.js';

// Initialize the Keycloak client
init();

// Initialize Redux Store
export const store = configureStore();

ReactDOM.render(<Root store={ store }/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
