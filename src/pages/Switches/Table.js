import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import {
  Table as PatternflyTable,
  TableHeader,
  TableBody,
  sortable,
  SortByDirection,
} from '@patternfly/react-table';

import { selectAll } from '../../state/switches';

const COLUMNS = [
  { key: 'id', title: 'Id', transforms: [sortable] },
  { key: 'name', title: 'Nombre', transforms: [sortable] },
  { key: 'description', title: 'Descripción', transforms: [sortable] },
  { key: 'model', title: 'Modelo', transforms: [sortable] },
  { key: 'ip', title: 'IP', transforms: [sortable] },
]

function Table({ items }) {
    const [sortBy, setSortBy] = React.useState({
      index: 0,
      direction: 'asc'
    });

    return (
      <PatternflyTable
        aria-label="Switches Table"
        sortBy={sortBy}
        onSort={onSort}
        cells={COLUMNS}
        rows={calculateRows(items, sortBy)}
      >
        <TableHeader />
        <TableBody rowKey={({rowData}) => rowData.cells[0]}/>
      </PatternflyTable>
    );

    function onSort(_, index, direction) {
      setSortBy({ index, direction });
    }
}

function calculateRows(items, sortBy) {
  const rows = items.map(item => ({ cells: COLUMNS.map(column => get(item, column.key)) }));
  if (sortBy.index === undefined || sortBy.direction === undefined) return rows;
  const { index, direction } = sortBy;
  const sortedRows = rows.sort((a, b) => (
    a.cells[index] < b.cells[index] 
      ? -1 
      : a.cells[index] > b.cells[index]
        ? 1
        : 0
  ));
  return direction === SortByDirection.asc ? sortedRows : sortedRows.reverse();
}

export default connect(selectAll)(Table);