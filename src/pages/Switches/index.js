import React from 'react';
import { 
  PageSection,
  PageSectionVariants,
} from '@patternfly/react-core';

import './index.css';
import VirtualTable from './VirtualTable';

export function Switches() {
  return (
    <>
    <PageSection variant={PageSectionVariants.light}>
      <VirtualTable />
    </PageSection>
    </>
  );
}

export default Switches;
