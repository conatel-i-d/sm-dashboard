import React from 'react';
import {
  Alert,
  AlertGroup,
  AlertActionCloseButton,
  AlertVariant
} from '@patternfly/react-core';
import { connect } from 'react-redux';

import { hide } from '../../state/alerts';
import get from 'lodash/get';

const ENTITY = 'alerts';

const Alerts = ({ alerts, hideAlert }) => {
  let count = 0;
  return (
    <React.Fragment>
      <AlertGroup isToast>
        { alerts.map(({ title, type, description }) => (
          <Alert
            isLiveRegion
            variant={AlertVariant[type]}
            title={title}
            key={++count}
            action={
              <AlertActionCloseButton onClose={() => hideAlert(title)} />
            }
          >{description}</Alert>
        ))}
      </AlertGroup>
    </React.Fragment>
  );
};

const getState = (state) => ({
  alerts: get(state, `${ENTITY}.visibles`, [])
});

const getDispatchers = (dispatch) => ({
  hideAlert: (state) => dispatch(hide(state))
});

export default connect(getState, getDispatchers)(Alerts);
