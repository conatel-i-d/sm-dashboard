import React from 'react';
import { 
  Page,
  PageSection,
  PageSectionVariants
} from '@patternfly/react-core';

import Header from './Header';
import Sidebar from './Sidebar';
import Breadcrumb from './Breadcrumb';

export function Layout({children}) {
  return (
    <Page
      header={<Header />}
      sidebar={<Sidebar />}
      isManagedSidebar={false}
    >
      <>
      <PageSection variant={PageSectionVariants.darker}>
        <Breadcrumb />
      </PageSection>
      {children}
      </>
    </Page>
  )
}

export default Layout;