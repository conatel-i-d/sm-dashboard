import React from 'react';
import { CellMeasurer } from 'react-virtualized';

export function createCellMeasurer(cache, items, key) {
  return function ({dataKey, parent, rowIndex}) {
    const content = items[rowIndex][key];

    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={dataKey}
        parent={parent}
        rowIndex={rowIndex}
      >
        <div style={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal'
        }}>
          {content}
        </div>
      </CellMeasurer>
    );
  }
}

export default createCellMeasurer;