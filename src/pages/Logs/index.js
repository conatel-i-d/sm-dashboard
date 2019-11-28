import React from 'react';
import { connect } from 'react-redux';

import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import Table from './Table';

import { get, getState, updateSortBy } from '../../state/logs';

const LogsPage = ({ get, sortBy, updateSortBy }) => {
  React.useEffect(() => {
    get();
  }, [get]);
  return (
    <PageSection variant={PageSectionVariants.light} className="Switches__Page">
      <Table sortBy={sortBy} onSort={updateSortBy} />
    </PageSection>
  );
};

export default connect(getState, { get, updateSortBy })(LogsPage);
