import './index.css';

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Tree from './TreeView'
import Toolbar from './Toolbar.js';

import {
  PageSection,
  PageSectionVariants,
  Bullseye
} from '@patternfly/react-core';
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';

import { updateFilterInput } from '../../state/nics';

import {
  selectAllAsTree ,
  get as getSwitches,
  edit
} from '../../state/switches';
import FindWizard from './Wizard';

import { findByMac, cancelFindByMac } from '../../state/macs'

const ENTITY = 'switches';

const MacSearchPage = ({
  location,
  loading,
  getSwitchesAsTree,
  findIsLoading,
  findResult,
  get,
  findByMac,
  updateFilterInput,
  handleCheckVisible
}) => {
  
  React.useEffect(() => { get() }, [get]);
  
  return (
    <>
          <PageSection
        variant={PageSectionVariants.light}
        className="Switches__Page"
      >
      <FindWizard
          location={location}
          onFind={findByMac}
          isLoading={findIsLoading}
          findResult={findResult}
          switchesTree={getSwitchesAsTree}
          cancelFindByMac={cancelFindByMac}
          updateFilterInput={updateFilterInput}

        />
        <Toolbar />
      </PageSection>

      <PageSection 
        variant={PageSectionVariants.light} 
        className="FindSearch__Page FindSearch__Page-InterfacesTable">
        {loading
          ? <Bullseye><Spinner /></Bullseye>
          : <Tree branches={getSwitchesAsTree} handleCheckVisible={handleCheckVisible} />
        }
      </PageSection>
    </>
  );
}

export const getState = state => ({
  loading: _.get(state, `${ENTITY}.loading`),
  getSwitchesAsTree: selectAllAsTree(state),
  findIsLoading: _.get(state, `macs.findLoading`, false),
  findResult: _.get(state, `macs.findResult`, [])
});

const getDispatchers = dispatch => ({
  get: (state) => dispatch(getSwitches(state)),
  findByMac: (state) => dispatch(findByMac(state)),
  updateFilterInput: (state) => dispatch(updateFilterInput(state)),
  handleCheckVisible: (state) => dispatch(edit(state))
});

export default connect(getState, getDispatchers)(MacSearchPage);
