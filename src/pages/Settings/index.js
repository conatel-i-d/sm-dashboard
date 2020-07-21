import React from 'react';
import { connect } from 'react-redux';
import {
  PageSection,
  PageSectionVariants,
  Bullseye
} from '@patternfly/react-core';
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';

import './index.css';
import Form from './Form.js';
import { selectLoading, getSettings } from '../../state/settings';

export function Settings({ loading, getSettings }) {
  React.useEffect(() => {
    getSettings();
  }, [getSettings]);

  return (
    <PageSection
        variant={PageSectionVariants.light}
        className="Settings__Page Settings__Page-Details"
      >
      { loading ? <Bullseye><Spinner /></Bullseye> : <Form /> }
    </PageSection>
  );
}

export default connect(selectLoading, { getSettings })(Settings);
