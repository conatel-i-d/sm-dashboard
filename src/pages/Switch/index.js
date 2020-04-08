import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import {
  PageSection,
  PageSectionVariants,
  Bullseye
} from '@patternfly/react-core';
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';

import './index.css'
import { getState } from '../Switches';
import { get as getSwitch } from '../../state/switches'
import {
  get as getInterfaces,
  getLoading,
  getState as getNicsState,
  updateSortBy,
  reboot
} from '../../state/nics';
import { combineStateSelectors } from '../../state/utils';
import SwitchDetails from './SwitchDetails.js';
import Table from './Table.js';
import Modal from './Modal.js';
import Toolbar from './Toolbar.js';

import './index.css';

const ENTITY = 'switches';

export function SwitchPage({
  loading,
  location,
  reboot,
  getSwitch,
  getInterfaces,
  sortBy,
  updateSortBy
}) {
  
  const switchId = React.useMemo(() => location.pathname.replace(`/${ENTITY}/`, '').replace('/reboot/nics', ''), [location]);

  React.useEffect(() => {
    if(!switchId.includes('reboot')) {
      getSwitch(switchId);
      getInterfaces(switchId);
    }
  }, [getSwitch, getInterfaces, switchId]);

  return (
    <>
      <PageSection
        variant={PageSectionVariants.light}
        className="Switch__Page Switch__Page-Details"
      >
        <Switch>
          <Route
            path="/switches/:id/reboot"
            render={() => <Modal onReboot={reboot} location={location} />}
          />
        </Switch>
        <SwitchDetails />
        <Toolbar />
      </PageSection>
      <PageSection 
        variant={PageSectionVariants.light} 
        className="Switch__Page Switch__Page-InterfacesTable">
        {loading
          ? <Bullseye><Spinner /></Bullseye>
          : <Table sortBy={sortBy} onSort={updateSortBy} />
        }
      </PageSection>
    </>
  );
}

export default connect(
  combineStateSelectors(getState, getNicsState, getLoading),
  {
    getSwitch,
    getInterfaces,
    updateSortBy,
    reboot
  }
)(SwitchPage);
