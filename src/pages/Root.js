import React from 'react';
import { Provider } from 'react-redux'
import { Router, Route, Switch } from "react-router-dom";

import { history } from '../modules/history.js';
import Layout from '../components/Layout';
import Home from './Home';
import Switches from './Switches'

export function Root({store}) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/switches" component={Switches} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  )
}

export default Root;