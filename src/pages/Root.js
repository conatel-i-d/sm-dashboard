import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';


import Keycloak from '../components/Keycloak/';
import { history } from '../modules/history'
import Main from './Main';

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
