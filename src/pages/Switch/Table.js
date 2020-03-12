import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Table/table';
import {
  Table as PatternflyTable,
  TableVariant,
  TableHeader,
  TableBody,
  sortable
} from '@patternfly/react-table';

import { Label } from '@patternfly/react-core';

import { history } from '../../modules/history.js';

import { selectSwitchNics, reboot } from '../../state/nics';

const COLUMNS = [
  { key: 'name', title: 'Nombre', transforms: [sortable] },
  { key: 'description', title: 'Descripción', transforms: [sortable] },
  { key: 'protocol', title: 'Estado', transforms: [sortable] },
  { key: 'adminisrtative_mode', title: 'Tipo', transforms: [sortable] }
];

function Table({ items, sortBy, onSort=() => {}, reboot, switchId }) {
  function onReboot(_, __, rowData) {
    const name = get(rowData, 'cells.0', '');
    history.push(`/switches/${switchId}/reboot?name=${name}`);
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
      variant={TableVariant.compact}
      rowWrapper={TableRowWrapper}
    >
      <TableHeader />
      <TableBody rowKey={({ rowData }) => rowData.cells[0]} />
    </PatternflyTable>
  );
}

function TableRowWrapper({trRef, className, rowProps, row: {isExpanded, isHeightAuto, cells}, ...props}) {
  const isTrunk = get(cells, '[4].title.props.children', '') === 'trunk';
  return (
    <tr
      {...props}
      className={css(
        className,
        isTrunk && 'Switch--TrunkInterface',
        isExpanded !== undefined && styles.tableExpandableRow,
        isExpanded && styles.modifiers.expanded,
        isHeightAuto && styles.modifiers.heightAuto
      )}
      hidden={isExpanded !== undefined && !!isExpanded}
    />
  )
}

function calculateRows(items) {
  if (items === undefined) return [];
  return items.map(item => ({
    cells: COLUMNS.map(column => {
      if (column.key === 'protocol') {
        const label = get(item, column.key);
        const className = label === 'up (connected) ' ? 'greenLabel' : 'normalLabel';
        return {
          title: <Label className={className}>{label}</Label>
        };
      } else if (column.key === 'adminisrtative_mode') {
        const label = get(item, column.key);
        const className = label === 'trunk' ? 'redLabel' : 'successLabel';
        return {
          title: <Label className={className}>{label}</Label>
        };
      } else return get(item, column.key);
    }),
    disableActions:
      item.state === 'down' || item['adminisrtative_mode'] === 'trunk'
        ? true
        : false
  }));
}

export default connect(selectSwitchNics, { reboot })(Table);
