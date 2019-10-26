import React from 'react';
import { connect } from 'react-redux';
import { Table, Column } from 'react-virtualized';
import { Link } from 'react-router-dom';

import VirtualTableHoC from '../../../components/VirtualTable';
import { selectAll } from '../../../state/switches';

export function VirtualTable({items, width, height, cache, table, createCellMeasurer}) {
  return <Table
    ref={table}
    className="pf-c-table"
    deferredMeasurementCache={cache}
    headerHeight={44}
    height={height - 150}
    overscanRowCount={2}
    rowHeight={cache.rowHeight}
    rowGetter={({index}) => items[index]}
    rowCount={items.length}
    width={width}
  >
    <Column
      label="Id"
      dataKey="id"
      width={60}
      cellRenderer={({dataKey, rowIndex}) => {
        const id = items[rowIndex][dataKey]
        return <Link to={`/switches/${id}`}>{id}</Link> 
      }}
    />
    <Column
      label="Nombre"
      dataKey="name"
      width={200}
      flexGrow={1}
    />
    <Column
      label="Descripción"
      dataKey="description"
      width={400}
      flexGrow={3}
      cellRenderer={createCellMeasurer(cache, items, 'description')}
    />
    <Column
      label="Modelo"
      dataKey="model"
      flexGrow={2}
      width={200}
    />
    <Column
      label="IP"
      dataKey="ip"
      flexGrow={2}
      width={200}
    />
  </Table>
}

export default VirtualTableHoC(connect(selectAll)(VirtualTable));
