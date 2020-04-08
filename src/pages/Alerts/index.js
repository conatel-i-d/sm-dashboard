import React from 'react';
import {
  Alert,
  AlertActionLink,
  AlertActionCloseButton
} from '@patternfly/react-core';
import { connect } from 'react-redux';

import { hide } from '../../state/alerts'
import get from 'lodash/get';

const ENTITY = 'alerts';


const Alerts = ({ alerts, hideAlert }) => {
  return (
    <React.Fragment>
      {alerts.map((alert) => 
        <Alert
          variant={alert.type}
          title={alert.title}
          action={
            <AlertActionCloseButton
              onClose={() => hideAlert(alert.title)}
            />
          }
        ></Alert>
      )}
    </React.Fragment>
  );
};

const getState = (state) => ({
  alerts: get(state, `${ENTITY}.visiles`, [])
})

const getDispatchers = dispatch => ({
  hideAlert: (state) => dispatch(hide(state))
})

export default connect(getState, getDispatchers)(Alerts)