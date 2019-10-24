import React from 'react';
import { Provider } from 'react-redux'
import { Router, Route, Switch } from "react-router-dom";

import { history } from '../modules/history.js';
import Layout from '../components/Layout';
import Home from './Home';
import TableView from './TableView'
import VirtualTableView from './VirtualTableView'
import EditResourceView from './EditResourceView'

export function Root({store}) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/table-view" component={TableView} />
            <Route path="/virtual-table-view/:id" component={EditResourceView} />
            <Route path="/virtual-table-view" component={VirtualTableView} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  )
}

export default Root;