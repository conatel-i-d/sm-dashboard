import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { AutoSizer } from '@patternfly/react-virtualized-extension';
import { Table, Column, CellMeasurerCache } from 'react-virtualized';
import { Link } from 'react-router-dom';

import createCellMeasurer from './createCellMeasurer.js';
import { selectBeers } from '../../../state/beers';
import { navState } from '../../../state/ui';
import { combineStateSelectors } from '../../../state/utils';

export function VirtualTableView({items, isNavOpen}) {
  const rowGetter = React.useCallback(({index}) => items[index], [items]);
  const cache = React.useMemo(() => new CellMeasurerCache({
    fixedWidth: true,
    defaultWidth: 150,
    minHeight: 44
  }), []);
  const table = React.useMemo(() => React.createRef(), []);
  const onResize = React.useMemo(() => debounce(() => {
    try {
      cache.clearAll();
      table.current.recomputeRowHeights();
    } catch {}
  }, 150), [cache, table]);

  React.useEffect(() => {
    const id = window.setTimeout(() => onResize(isNavOpen), 250);

    return () => window.clearTimeout(id);
  }, [onResize, isNavOpen]);

  React.useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [onResize])

  return (
    <div
      style={{height: '100%'}}
      aria-label="Beers"
      role="grid"
      className="pf-c-scrollablegrid"
      aria-rowcount={items.length}
    >
    <AutoSizer>{({width, height}) => (
      <Table
        ref={table}
        className="pf-c-table"
        deferredMeasurementCache={cache}
        headerHeight={44}
        height={height}
        overscanRowCount={2}
        rowHeight={cache.rowHeight}
        rowGetter={rowGetter}
        rowCount={items.length}
        width={width}
      >
        <Column
          label="Id"
          dataKey="id"
          width={60}
          cellRenderer={({dataKey, rowIndex}) => {
            const id = items[rowIndex][dataKey]
            return <Link to={`/virtual-table-view/${id}`}>{id}</Link> 
          }}
        />
        <Column
          label="Name"
          dataKey="name"
          width={200}
          flexGrow={1}
        />
        <Column
          label="Tag Line"
          dataKey="tagline"
          flexGrow={2}
          width={200}
        />
        <Column
          label="Description"
          dataKey="description"
          width={400}
          flexGrow={3}
          cellRenderer={createCellMeasurer(cache, items, 'description')}
        />
        <Column
          label="First Brewed"
          dataKey="first_brewed"
          width={150}
        />
      </Table>
    )}</AutoSizer>
    </div>
  );
}

export default connect(combineStateSelectors(selectBeers, navState))(VirtualTableView);
