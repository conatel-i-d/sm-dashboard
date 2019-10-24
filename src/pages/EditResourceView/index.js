import React from 'react';
import {  connect } from 'react-redux';
import { 
  PageSection,
  PageSectionVariants,
} from '@patternfly/react-core';

import { selectBeer } from '../../state/beers';

export function EditResourceView({item}) {
  return (
    <PageSection variant={PageSectionVariants.light}>
      <pre>{JSON.stringify(item, null, 2)}</pre>
    </PageSection>
  )
}

export default connect(selectBeer)(EditResourceView);
