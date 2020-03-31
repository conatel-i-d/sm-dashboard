import './index.css';

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Tree } from './TreeView'
import Modal from './Modal';
import Toolbar from './Toolbar.js';

import {
  PageSection,
  PageSectionVariants,
  Bullseye
} from '@patternfly/react-core';
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';


import {
  selectAllAsTree ,
  get as getSwitches,
  getModel,
  create,
  edit,
  destroy
} from '../../state/switches';

const ENTITY = 'switches';

export function MacSearchPage({
  loading,
  getSwitchesAsTree,
  model,
  get,
  create,
  edit,
  destroy,
  findMac
}) {
  
  React.useEffect(() => { get() }, [get]);
  
  return (
    <>
          <PageSection
        variant={PageSectionVariants.light}
        className="Switches__Page"
      >
        <Modal
          model={model}
          onAccept={create}
          onEdit={edit}
          onDelete={destroy}
          onFind={findMac}
        />
        <Toolbar />
      </PageSection>

      <PageSection 
        variant={PageSectionVariants.light} 
        className="FindSearch__Page FindSearch__Page-InterfacesTable">
        {loading
          ? <Bullseye><Spinner /></Bullseye>
          : <Tree branches={getSwitchesAsTree}/>
        }
      </PageSection>
    </>
  );
}

export const getState = state => ({
  loading: _.get(state, `${ENTITY}.loading`),
  getSwitchesAsTree: selectAllAsTree(state),
  model: getModel(state)
});

const getDispatchers = dispatch => ({
  get: (state) => dispatch(getSwitches(state)),
  create: (state) => dispatch(create(state)),
  edit: (state) => dispatch(edit(state)),
  destroy: (state) => dispatch(destroy(state)),
});

export default connect(getState, getDispatchers)(MacSearchPage);
