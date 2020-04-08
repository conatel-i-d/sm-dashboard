import React from 'react';
import get from 'lodash/get';
import '@patternfly/react-styles';
import '@patternfly/react-styles/css/components/Table/table';
import {
  Table as PatternflyTable,
  TableVariant,
  TableHeader,
  TableBody,
  sortable
} from '@patternfly/react-table';

import { Button } from '@patternfly/react-core';

import { history } from '../../../modules/history';

const COLUMNS = [
  { key: 'switch_id', title: 'SW ID', transforms: [sortable] },
  { key: 'switch_name', title: 'SW Name', transforms: [sortable] },
  { key: 'name', title: 'NIC Name', transforms: [sortable] }
];

export const Table = ({ items, updateFilterInput, findMac }) => {
  return (
    <>
      <PatternflyTable
        aria-label="Switches Table"
        cells={COLUMNS}
        rows={calculateRows(items, updateFilterInput, findMac)}
        variant={TableVariant.compact}
      >
        <TableHeader />
        <TableBody rowKey={({ rowData }) => rowData.cells[0]} />
      </PatternflyTable>
    </>
  );
};

function calculateRows(items, updateFilterInput, findMac) {
  if (items === undefined) return [];
  return items.map((item) => ({
    cells: COLUMNS.map((column) => {
      if (column.key === 'name') {
        return {
          title: (
            <Button
              component="a"
              onClick={() => {
                handleGoToInterface(item, updateFilterInput, findMac);
              }}
              target="_blank"
              variant="primary"
            >
              {item.name}
            </Button>
          )
        };
      } else return get(item, column.key);
    })
  }));
}

const handleGoToInterface = (item, updateFilterInput, findMac) => {
  updateFilterInput(findMac);
  history.push(`/switches/${item.switch_id}`);
};

export default Table;
