import React from 'react';
import { Provider } from 'react-redux'
import { Router, Route, Switch as RouterSwitch } from "react-router-dom";

import { history } from '../modules/history.js';
import Layout from '../components/Layout';
import Home from './Home';
import Switches from './Switches';
import Switch from './Switch';

export function Root({store}) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Layout>
          <RouterSwitch>
            <Route exact path="/" component={Home} />
            <Route exact path="/switches/:id(\d+)" component={Switch} />
            <Route path="/switches" component={Switches} />
          </RouterSwitch>
        </Layout>
      </Router>
    </Provider>
  )
}

export default Root;