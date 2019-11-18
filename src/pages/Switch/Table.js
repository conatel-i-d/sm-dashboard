import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import {
  Table as PatternflyTable,
  TableHeader,
  TableBody,
  sortable
} from '@patternfly/react-table';

import { selectSwitchNics, reboot } from '../../state/nics';

const COLUMNS = [
  { key: 'name', title: 'Nombre', transforms: [sortable] },
  { key: 'description', title: 'Descripción', transforms: [sortable] },
  { key: 'state', title: 'Estado', transforms: [sortable] },
  { key: 'switchport', title: 'Switchport', transforms: [sortable] },
  { key: 'adminisrtative_mode', title: 'Tipo', transforms: [sortable] }
];

function Table({ items, sortBy, onSort, reboot, switchId }) {
  function onReboot(_, __, rowData) {
    const name = get(rowData, 'cells.0', '');
    reboot({ name, switchId });
  }
  return (
    <PatternflyTable
      aria-label="Switches Table"
      sortBy={sortBy}
      onSort={(_, index, direction) =>
        onSort({ index, direction, key: get(COLUMNS, `${index}.key`) })
      }
      cells={COLUMNS}
      rows={calculateRows(items, sortBy)}
      actions={[{ title: 'Reiniciar', onClick: onReboot }]}
    >
      <TableHeader />
      <TableBody rowKey={({ rowData }) => rowData.cells[0].key} />
    </PatternflyTable>
  );
}

function onSort() {}

function calculateRows(items) {
  if (items === undefined) return [];
  return items.map(item => ({
    cells: COLUMNS.map(column => get(item, column.key))
  }));
}

export default connect(selectSwitchNics, { reboot })(Table);
