import React from 'react';
import { 
  PageSection,
  PageSectionVariants,
} from '@patternfly/react-core';

import './index.css';
import VirtualTable from './VirtualTable';
import Toolbar from '../../components/Beers/Toolbar';

export function VirtualTableView() {
  return (
    <>
    <PageSection variant={PageSectionVariants.light}>
      <Toolbar />
    </PageSection>
    <PageSection variant={PageSectionVariants.light}>
      <VirtualTable />
    </PageSection>
    </>
  );
}

export default VirtualTableView;
