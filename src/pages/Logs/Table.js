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
  { key: 'user_id', title: 'Usuario', transforms: [sortable] },
  { key: 'date', title: 'Fecha', transforms: [sortable] },
  { key: 'event_type', title: 'Tipo de Evento', transforms: [sortable] },
  { key: 'event_result', title: 'Resultado', transforms: [sortable] },
  { key: 'entity', title: 'Entidad', transforms: [sortable] },
  { key: 'payload', title: 'Cuerpo', transforms: [sortable] }
];

function Table({ items, sortBy, onSort }) {
  return (
    <PatternflyTable
      aria-label="Switches Table"
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
          return rowData.cells[1];
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
