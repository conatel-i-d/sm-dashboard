import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch as RouterSwitch } from 'react-router-dom';

import { history } from '../modules/history.js';
import Main from './Main'
import Login from './Login';

export function Root({ store }) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <RouterSwitch>
          <Route exact path="/login" component={Login} />
          <Route component={Main} />
        </RouterSwitch>
      </Router>
    </Provider>
  );
}

export default Root;
