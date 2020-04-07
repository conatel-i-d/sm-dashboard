import React from 'react';
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

import { Label, Button } from '@patternfly/react-core';

import workingIcon from './working-icon.gif';

const FILTER_RESET_ENABLES = ['trunk'];
const FILTER_ITEMS_BY_NAME = ['Te'];

const COLUMNS = [
  { key: 'switch_Id', title: 'SW ID', transforms: [sortable] },
  { key: 'switch', title: 'SW Name', transforms: [sortable] },
  { key: 'name', title: 'NIC Name', transforms: [sortable] },
  { key: 'description', title: 'Description', transforms: [sortable] },
  { key: 'protocol', title: 'Status', transforms: [sortable] },
  { key: 'adminisrtative_mode', title: 'Type', transforms: [sortable] }
];

export const Table = ({ items, reboot, rebootLoading }) => {
  const [rebootState, setRebootState] = React.useState({
    sure: false,
    swID: 0,
    nicName: ''
  });
  
  function onReboot(_, __, rowData) {
    const swID = get(rowData, 'cells.0', '');
    const nicName = get(rowData, 'cells.2', '');
    setRebootState({ sure: true, swID, nicName });
  }

  function handleReboot() {
    reboot({ switchId: rebootState.swID, name: rebootState.nicName })
    setRebootState({...rebootState, sure: false})
  }

  function handleCancelReboot() {
    setRebootState({...rebootState, sure: false})
  }

  return rebootLoading === 'rebooting' ? (
    <>
      <div className="pf-l-bullseye">
        <div className="pf-c-empty-state pf-m-lg">
          <h1 className="pf-c-title pf-m-lg">Reseteando...</h1>
          <div className="pf-c-empty-state__body">
            <img className="working-icon" src={workingIcon} />
          </div>
          <div className="pf-c-empty-state__body">
            Puede tardar alunos minutos!!!
          </div>
        </div>
      </div>
    </>
  ) :
  rebootState.sure ? <> 
  <p>¿Esta seguro que desea resetear la interface?</p>
  <Button onClick={handleReboot}>Si</Button>
  <Button onClick={handleCancelReboot}>No</Button>
  </>
  : (
    <>
      <PatternflyTable
        aria-label="Switches Table"
        cells={COLUMNS}
        rows={calculateRows(items)}
        actions={[{ title: 'Reiniciar', onClick: onReboot }]}
        variant={TableVariant.compact}
        rowWrapper={TableRowWrapper}
      >
        <TableHeader />
        <TableBody rowKey={({ rowData }) => rowData.cells[0]} />
      </PatternflyTable>
    </>
  );
};

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
  const { state, description } = item;
  return (
    state === 'down' ||
    administrativeMode === 'trunk' ||
    (description !== undefined && description !== null
      ? !FILTER_RESET_ENABLES.every(
          (cond) => !description.toLowerCase().includes(cond)
        )
      : false)
  );
}

function calculateRows(items) {
  if (items === undefined) return [];
  return items.map((item) => ({
    cells: COLUMNS.map((column) => {
      if (column.key === 'protocol') {
        const label = get(item, column.key);
        const className =
          label === 'up (connected) ' ? 'greenLabel' : 'normalLabel';
        return {
          title: <Label className={className}>{label || 'unknown'}</Label>
        };
      } else if (column.key === 'adminisrtative_mode') {
        const label = get(item, column.key);
        const className = label === 'trunk' ? 'redLabel' : 'successLabel';
        return {
          title: <Label className={className}>{label || 'unknown'}</Label>
        };
      } else return get(item, column.key);
    }),
    disableActions: validateResetNic(item)
  }));
}

// export default connect(getFoundMacsInterfaces, { reboot })(Table);

export default Table;
