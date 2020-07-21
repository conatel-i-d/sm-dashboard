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
import { find } from 'lodash';

const COLUMNS = [
  { key: 'switch_id', title: 'SW ID', transforms: [sortable] },
  { key: 'switch_name', title: 'SW Name', transforms: [sortable] },
  { key: 'interface_name', title: 'NIC Name', transforms: [sortable] },
  { key: 'mac_address', title: 'MAC', transforms: [sortable] }
];

const Table = ({ items }) => {
  return (
    <>
      <PatternflyTable
        aria-label="Switches Table"
        cells={COLUMNS}
        rows={calculateRows(items)}
        variant={TableVariant.compact}
      >
        <TableHeader />
        <TableBody rowKey={({ rowData }) => `${rowData.cells[0]}${rowData.cells[2]}`} />
      </PatternflyTable>
    </>
  );
};

function calculateRows(items) {
  if (items === undefined) return [];
  return items.map((item) => ({
    cells: COLUMNS.map((column) => {
      if (column.key === 'interface_name') {
        return {
          title: (
            <Button
              component="a"
              onClick={() => {
                handleGoToInterface(item);
              }}
              target="_blank"
              variant="primary"
            >
              {item.interface_name}
            </Button>
          )
        };
      } else return get(item, column.key);
    })
  }));
}

const handleGoToInterface = (item) => {
  history.push(`/switches/${item.switch_id}?found_interface=${item.interface_name}&found_mac=${item.mac_address}`);
};

export default Table;
