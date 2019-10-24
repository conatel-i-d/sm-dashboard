import React from 'react';
import { connect } from 'react-redux';
import { 
  PageSection,
  PageSectionVariants,
} from '@patternfly/react-core';
import { Table, TableHeader, TableBody } from '@patternfly/react-table'
import Toolbar from '../../components/Beers/Toolbar';

import { selectBeers } from '../../state/beers';

export function TableView({items}) {
  const columns = React.useMemo(() => [
    { title: 'Id'},
    { title: 'Name'},
    { title: 'Tag Line'},
    { title: 'Description'},
    { title: 'First Brewed'},
  ], []);
  const rows = React.useMemo(() => items.map(item => ({
    id: item.id,
    cells: [item.id, item.name, item.tagline, item.description, item.first_brewed]
  })), [items]);

  return (
    <>
    <PageSection variant={PageSectionVariants.light}>
      <Toolbar />
    </PageSection>
    <PageSection variant={PageSectionVariants.light}>
      <div
        style={{height: '100%'}}
        aria-label="Beers"
        role="grid"
        className="pf-c-scrollablegrid"
        aria-rowcount={rows.length}
      >
        <Table
          aria-label="Beers"
          cells={columns}
          rows={rows}
          role="table"
        >
          <TableHeader />
          <TableBody rowKey={({rowData}) => rowData.id.title} />
        </Table>
      </div>
    </PageSection>
    </>
  );
}

export default connect(selectBeers)(TableView);