import React from 'react';
import {
  PageSection,
  PageSectionVariants,
} from '@patternfly/react-core';

export function Home() {
  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
        <h1>Home</h1>
      </PageSection>
    </React.Fragment>
  );
}

export default Home;