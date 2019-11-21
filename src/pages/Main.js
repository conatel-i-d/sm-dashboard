import React from 'react';

import { Route, Switch as RouterSwitch } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from './Home';
import Switches from './Switches';
import Switch from './Switch';

export function Main() {
  return (
    <Layout>
      <RouterSwitch>
        <Route exact path="/" component={Home} />
        <Route path="/switches/:id(\d+)" component={Switch} />
        <Route path="/switches" component={Switches} />
      </RouterSwitch>
    </Layout>
  );
}

export default Main;
