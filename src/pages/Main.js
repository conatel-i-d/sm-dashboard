import React from 'react';

import { Route, Switch as RouterSwitch } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from './Home';
import Switches from './Switches';
import Switch from './Switch';
import Logs from './Logs';

export function Main() {
  return (
    <Layout>
      <RouterSwitch>
        <Route exact path="/" component={Home} />
        <Route path="/switches/:id(\d+)" component={Switch} />
        <Route path="/switches" component={Switches} />
        <Route exact path="/logs" component={Logs} />
      </RouterSwitch>
    </Layout>
  );
}

export default Main;
