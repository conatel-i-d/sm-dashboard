import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import {
  PageSection,
  PageSectionVariants,
  Bullseye
} from '@patternfly/react-core';
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';

import { get as getSwitch, getState } from '../../state/switches';
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

import './index.css';

const ENTITY = 'switches';

export function SwitchPage({
  loading,
  location,
  model,
  reboot,
  getSwitch,
  getInterfaces,
  sortBy,
  updateSortBy
}) {
  const [switchId, _] = React.useState(
    location.pathname.replace(`/${ENTITY}/`, '')
  );

  React.useEffect(() => {
    getSwitch({ id: switchId });
    getInterfaces({ switchId });
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

        <SwitchDetails model={model} />
      </PageSection>
      <PageSection variant={PageSectionVariants.light} className="Switch__Page">
        {loading ? (
          <Bullseye>
            <Spinner />
          </Bullseye>
        ) : (
          <Table sortBy={sortBy} onSort={updateSortBy} />
        )}
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
