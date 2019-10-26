import React from 'react';
import { connect } from 'react-redux'
import { 
  PageSection,
  PageSectionVariants,
} from '@patternfly/react-core';

import './index.css';
import Modal from './Modal';
import VirtualTable from './VirtualTable';
import Toolbar from './Toolbar';
import { getAll, create, getState, toggleModal } from '../../state/switches'

export function Switches({ getAll, create, isModalOpen, toggleModal }) {
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
      <VirtualTable />
    </PageSection>
    </>
  );
}

export default connect(getState, { getAll, create, toggleModal })(Switches);
