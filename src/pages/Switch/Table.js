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

import { getUserRoles } from '../../state/utils'

const FILTER_RESET_ENABLES = ['trunk']
const FILTER_ITEMS_BY_NAME = ['Te']

const COLUMNS = [
  { key: 'name', title: 'Nombre', transforms: [sortable] },
  { key: 'description', title: 'Descripción', transforms: [sortable] },
  { key: 'protocol', title: 'Estado', transforms: [sortable] },
  { key: 'adminisrtative_mode', title: 'Tipo', transforms: [sortable] }
];

const Table = ({ items, sortBy, onSort = () => {}, reboot, switchId }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  function onReboot(_, __, rowData) {
    const name = get(rowData, 'cells.0', '');
    history.push(`/switches/${switchId}/reboot?name=${name}`);
  }

  const handleModalToggle = args => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <PatternflyTable
        aria-label="Switches Table"
        sortBy={sortBy}
        onSort={(_, index, direction) =>
          onSort({ index, direction, key: get(COLUMNS, `${index}.key`) })
        }
        cells={COLUMNS}
        rows={calculateRows(items, sortBy, handleModalToggle)}
        actions={[{ title: 'Reiniciar', onClick: onReboot }]}
        variant={TableVariant.compact}
        rowWrapper={TableRowWrapper}
      >
        <TableHeader />
        <TableBody rowKey={({ rowData }) => rowData.cells[0]} />
      </PatternflyTable>
    </>
  );
}

function TableRowWrapper({
  trRef,
  className,
  rowProps,
  row: { isExpanded, isHeightAuto, cells },
  ...props
}) {
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
  );
}


function validateResetNic(item) {
  const administrativeMode = get(item, 'adminisrtative_mode');
  const protocol = get(item, "protocol");
  const { description } = item;
  return (protocol.includes('down') && !protocol.includes("err-disable")) || 
  administrativeMode === 'trunk' ||
  (!getUserRoles().includes('administrator') && !getUserRoles().includes('operator')) ||
  (description && !FILTER_RESET_ENABLES.every(cond => !description.toLowerCase().includes(cond)))
}

function filterItemsByName(item) {
  return (item.name !== undefined && item.name !== null)
  ? FILTER_ITEMS_BY_NAME.every(cond => !item.name.includes(cond))
  : true
}

function calculateRows(items, sortBy, handleModalToggle) {
  if (items === undefined) return [];
  const filteredItems = items.filter(filterItemsByName)
  return filteredItems.map(item => ({
    cells: COLUMNS.map(column => {
      if (column.key === 'protocol') {
        let label = get(item, column.key, 'unknown');
        const className =
          label.toLowerCase().includes('up') ? 'greenLabel' : 'normalLabel';
        return {
          title: <Label className={className}>{label}</Label>
        };
      } else if (column.key === 'adminisrtative_mode') {
        const label = get(item, column.key, 'unknown');
        const className = label === 'trunk' ? 'redLabel' : 'successLabel';
        return {
          title: <Label className={className}>{label}</Label>
        };
      } else return get(item, column.key);
    }),
    disableActions: validateResetNic(item)
  }));
}

export default connect(selectSwitchNics, { reboot })(Table);
