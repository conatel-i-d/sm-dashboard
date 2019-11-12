import React from 'react';
import { connect } from 'react-redux';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';

import { get, getState } from '../../state/switches';
import SwitchDetails from './SwitchDetails.js';
import Table from './Table.js';
import './index.css'

const ENTITY = 'switches';

export function Switch({ location, model, get }) {
  React.useEffect(() => {
    get({ id: location.pathname.replace(`/${ENTITY}/`, '') });
  }, [get, location]);

  return (
    <>
      <PageSection variant={PageSectionVariants.light} className="Switch__Page Switch__Page-Details">
        <SwitchDetails model={model} />
      </PageSection>
      <PageSection variant={PageSectionVariants.light} className="Switch__Page">
        <Table />
      </PageSection>ß
    </>
  );
}

export default connect(
  getState,
  { get }
)(Switch);
