import React from 'react';
import { 
  Page,
  PageSection,
  PageSectionVariants
} from '@patternfly/react-core';

import './index.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Breadcrumb from './Breadcrumb';

export function Layout({children}) {
  return (
    <Page
      header={<Header />}
      sidebar={<Sidebar />}
      isManagedSidebar={false}
      className="Layout"
    >
      <>
      <PageSection variant={PageSectionVariants.darker} noPadding={true} className="Breadcrumb">
        <Breadcrumb />
      </PageSection>
      {children}
      </>
    </Page>
  )
}

export default Layout;