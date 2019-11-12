import React from 'react';
import { connect } from 'react-redux';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';

import { get as getSwitch, getState } from '../../state/switches';
import { get as getInterfaces } from '../../state/nics';
import SwitchDetails from './SwitchDetails.js';
import Table from './Table.js';
import './index.css'

const ENTITY = 'switches';

export function Switch({ location, model, getSwitch, getInterfaces }) {
  React.useEffect(() => {
    const switchId = location.pathname.replace(`/${ENTITY}/`, '')
    getSwitch({ id: switchId });
    getInterfaces({ switchId });
  }, [getSwitch, getInterfaces, location]);

  return (
    <>
      <PageSection variant={PageSectionVariants.light} className="Switch__Page Switch__Page-Details">
        <SwitchDetails model={model} />
      </PageSection>
      <PageSection variant={PageSectionVariants.light} className="Switch__Page">
        <Table />
      </PageSection>
    </>
  );
}

export default connect(
  getState,
  { getSwitch, getInterfaces }
)(Switch);
