import React from 'react';

import { Route, Switch as RouterSwitch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from '../components/Layout';
import Home from './Home';
import Switches from './Switches';
import Switch from './Switch';
import Logs from './Logs';
import MacSearch from './MacSearch'
import Settings from './Settings';
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';
import { Bullseye } from '@patternfly/react-core';
import { initializingApp } from '../state/ui';
import get from 'lodash/get';

import Alerts from './Alerts'

export function Main({ ready, initializingApp }) {
  
  React.useEffect(() => {
    initializingApp()
  }, [initializingApp]);

  if (ready === false) return <Bullseye><Spinner /></Bullseye>

  return (
    <>
    { ready ? 
    <Layout>
      <RouterSwitch>
        <Route exact path="/" component={Home} />
        <Route path="/switches/:id(\d+)" component={Switch} />
        <Route path="/switches" component={Switches} />
        <Route exact path="/logs" component={Logs} />
        <Route exact path="/settings" component={Settings} />
        <Route path="/macSearch" component={MacSearch} />
      </RouterSwitch>
      <Alerts />
    </Layout>
    : <Bullseye><Spinner /></Bullseye>
    }
    </>
  );
}

export const getState = state => ({
  ready: get(state, `ui.status.ready`)
});

const getDispatchers = dispatch => ({
  initializingApp: (state) => dispatch(initializingApp(state))
});

export default connect(getState, getDispatchers)(Main);
