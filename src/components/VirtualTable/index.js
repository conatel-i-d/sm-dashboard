import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { AutoSizer } from '@patternfly/react-virtualized-extension';
import { CellMeasurerCache } from 'react-virtualized';

import createCellMeasurer from './createCellMeasurer.js';
import { navState } from '../../state/ui';

export function VirtualTableHoC(Component) {
  function VirtualTable({
    isNavOpen,
    fixedWidth = true,
    defaultWidth = 150,
    minHeight = 44,
  }) {
    const cache = React.useMemo(() => new CellMeasurerCache({
      fixedWidth,
      defaultWidth,
      minHeight,
    }), [fixedWidth, defaultWidth, minHeight]);
    const table = React.useMemo(() => React.createRef(), []);
    const onResize = React.useMemo(() => debounce(() => {
      try {
        cache.clearAll();
        table.current.recomputeRowHeights();
      } catch {}
    }, 150), [cache, table]);
  
    React.useEffect(() => {
      const id = window.setTimeout(() => onResize(isNavOpen), 250);
  
      return () => window.clearTimeout(id);
    }, [onResize, isNavOpen]);
  
    React.useEffect(() => {
      window.addEventListener('resize', onResize);
  
      return () => window.removeEventListener('resize', onResize);
    }, [onResize])
  
    return (
      <div
        style={{height: 'calc(100% - 36px)'}}
        role="grid"
        className="pf-c-scrollablegrid"
      >
      <AutoSizer>{({width, height}) => (
        <Component {...{width, height, cache, table, createCellMeasurer}} />
      )}</AutoSizer>
      </div>
    );
  }
  return connect(navState)(VirtualTable)
}

export default VirtualTableHoC;
