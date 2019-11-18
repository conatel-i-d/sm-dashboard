import React from 'react';
import { connect } from 'react-redux';
import { PageSection, PageSectionVariants, Bullseye } from '@patternfly/react-core';
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';

import { get as getSwitch, getState } from '../../state/switches';
import { get as getInterfaces, getLoading } from '../../state/nics';
import { combineStateSelectors } from '../../state/utils';
import SwitchDetails from './SwitchDetails.js';
import Table from './Table.js';
import './index.css'

const ENTITY = 'switches';

export function Switch({ loading, location, model, getSwitch, getInterfaces }) {
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
        {loading
          ? <Bullseye><Spinner /></Bullseye>
          : <Table />
        }
        
      </PageSection>
    </>
  );
}

export default connect(
  combineStateSelectors(getState, getLoading),
  { getSwitch, getInterfaces }
)(Switch);
