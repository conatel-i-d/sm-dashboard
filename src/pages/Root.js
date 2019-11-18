import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch as RouterSwitch } from 'react-router-dom';

import { history } from '../modules/history.js';
import Keycloak from '../components/Keycloak/';
import Main from './Main'

export function Root({ store }) {
  return (
    <Keycloak>
      <Provider store={store}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>
    </Keycloak>
  );
}

export default Root;
