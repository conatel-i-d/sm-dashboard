import React from 'react';
import { connect } from 'react-redux';

import get from 'lodash/get';
import {
  Table as PatternflyTable,
  TableVariant,
  TableHeader,
  TableBody,
  sortable
} from '@patternfly/react-table';

import { selectAll } from '../../state/logs';

const COLUMNS = [
  { key: 'user_name', title: 'Usuario', transforms: [sortable] },
  { key: 'http_url', title: 'URL', transforms: [sortable] },
  { key: 'http_method', title: 'Metodo http', transforms: [sortable] },
  { key: 'payload', title: 'Body', transforms: [sortable] },
  { key: 'date_start', title: 'Inicio', transforms: [sortable] },
  { key: 'date_end', title: 'End', transforms: [sortable] },
  { key: 'response_status_code', title: 'Resp Status', transforms: [sortable] },
  { key: 'message', title: 'Resp Message', transforms: [sortable] },
];

function Table({ items, sortBy, onSort }) {
  return (
    <PatternflyTable
      aria-label="Logs Table"
      sortBy={sortBy}
      onSort={(_, index, direction) =>
        onSort({ index, direction, key: get(COLUMNS, `${index}.key`) })
      }
      cells={COLUMNS}
      rows={calculateRows(items, sortBy)}
      variant={TableVariant.compact}
    >
      <TableHeader />

      <TableBody
        rowKey={({ rowData }) => {
          return rowData.cells[5];
        }}
      />
    </PatternflyTable>
  );
}

function calculateRows(items) {
  if (items === undefined) return [];
  return items.map(item => ({
    cells: COLUMNS.map(column => {
      return get(item, column.key);
    })
  }));
}

export default connect(selectAll)(Table);
