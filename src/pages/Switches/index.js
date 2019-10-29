import React from 'react';
import { connect } from 'react-redux'
import { 
  PageSection,
  PageSectionVariants,
} from '@patternfly/react-core';

import './index.css';
import Modal from './Modal.js';
import Table from './Table';
import Toolbar from './Toolbar.js';
import { getAll, create, getState, toggleModal, updateSortBy } from '../../state/switches'

export function Switches({ sortBy, getAll, create, isModalOpen, toggleModal, updateSortBy }) {
  React.useEffect(() => {
    getAll();
  }, [getAll]);

  return (
    <>
    <PageSection variant={PageSectionVariants.light} className="Switches__Page">
      <Modal isModalOpen={isModalOpen} onClose={toggleModal} onAccept={create} />
      <Toolbar />
    </PageSection>
    <PageSection variant={PageSectionVariants.light} className="Switches__Page">
      <Table sortBy={sortBy} onSort={updateSortBy} />
    </PageSection>
    </>
  );
}

export default connect(getState, { getAll, create, toggleModal, updateSortBy })(Switches);
