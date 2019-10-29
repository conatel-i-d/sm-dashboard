import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import {
  Table as PatternflyTable,
  TableHeader,
  TableBody,
  sortable
} from '@patternfly/react-table';

import { selectAll } from '../../state/switches';
import { history } from '../../modules/history.js';

const ENTITY = 'switches'
const COLUMNS = [
  { key: 'id', title: 'Id', transforms: [sortable] },
  { key: 'name', title: 'Nombre', transforms: [sortable] },
  { key: 'description', title: 'Descripción', transforms: [sortable] },
  { key: 'model', title: 'Modelo', transforms: [sortable] },
  { key: 'ip', title: 'IP', transforms: [sortable] },
]

const onEdit = onActionFactory('edit');
const onDelete = onActionFactory('delete');

function Table({ items, sortBy, onSort }) {
    return (
      <PatternflyTable
        aria-label="Switches Table"
        sortBy={sortBy}
        onSort={(_, index, direction) => onSort({index, direction, key: get(COLUMNS, `${index}.key`)})}
        cells={COLUMNS}
        rows={calculateRows(items, sortBy)}
        actions={[
          { title: 'Editar', onClick: onEdit },
          { title: <div style={{color: 'red'}}>Eliminar</div>, onClick: onDelete }
        ]}
      >
        <TableHeader />
        <TableBody rowKey={({rowData}) => rowData.cells[0]} />
      </PatternflyTable>
    );
}

function onActionFactory(action) {
  return function(_, __, rowData) {
    const id = get(rowData, 'id.title', '');
    history.push(`/${ENTITY}/${action}/${id}`);
  };
}

function calculateRows(items) {
  return items.map(item => ({ cells: COLUMNS.map(column => get(item, column.key)) }));
}

export default connect(selectAll)(Table);