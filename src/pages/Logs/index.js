import React from 'react';
import { connect } from 'react-redux';

import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import Table from './Table';
import Toolbar from './Toolbar'
import { get, selectAll, updateSortBy } from '../../state/logs';

const LogsPage = ({ get, sortBy, updateSortBy }) => {
  React.useEffect(() => {
    get();
  }, [get]);
  return (
    <>
    <PageSection>
      <Toolbar />
    </PageSection>
    <PageSection variant={PageSectionVariants.light} className="Logs__Page">
      <Table sortBy={sortBy} onSort={updateSortBy} />
    </PageSection>
    </>
  );
};

export default connect(selectAll, { get, updateSortBy })(LogsPage);
