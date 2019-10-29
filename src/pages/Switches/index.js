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
import { getAll, create, edit, destroy, getState, updateSortBy } from '../../state/switches'

export function Switches({ model, sortBy, getAll, create, edit, destroy, updateSortBy }) {
  React.useEffect(() => {
    getAll();
  }, [getAll]);

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

export default connect(getState, { getAll, create, edit, destroy, updateSortBy })(Switches);
