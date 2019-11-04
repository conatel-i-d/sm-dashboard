import React from 'react';
import { connect } from 'react-redux'
import { 
  PageSection,
  PageSectionVariants,
} from '@patternfly/react-core';

import './index.css';
import Modal from './Modal';
import Table from './Table';
import Toolbar from './Toolbar.js';
import { get, create, edit, destroy, getState, updateSortBy } from '../../state/switches'

export function Switches({ model, sortBy, get, create, edit, destroy, updateSortBy }) {
  React.useEffect(() => {
    get();
  }, [get]);

  return (
    <>
    <PageSection variant={PageSectionVariants.light} className="Switches__Page">
      <Modal model={model} onAccept={create} onEdit={edit} onDelete={destroy} />
      <Toolbar />
    </PageSection>
    <PageSection variant={PageSectionVariants.light} className="Switches__Page">
      <Table sortBy={sortBy} onSort={updateSortBy} />
    </PageSection>
    </>
  );
}

export default connect(getState, { get, create, edit, destroy, updateSortBy })(Switches);
