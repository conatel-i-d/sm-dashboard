import React from 'react';
import { SimpleListGroup } from '@patternfly/react-core';

import { BranchCard } from './BranchCard';
import { Leaf } from '../Leaf'
export const Branch = ({ name, branches = [] }) => {
  var [open, setOpen] = React.useState(false);

  var handleOnClick = React.useCallback(
    e => {
      e.stopPropagation();
      setOpen(!open);
    },
    [open, setOpen]
  );

  console.log("branches", branches);

  return (
    <SimpleListGroup title={<BranchCard value={{name, isOpen: open, branches}}/>} onClick={handleOnClick}>
      {open &&
        branches.map((branch, index) =>
          branch.type === 'leaf' ? (
            <Leaf key={index} value={branch.value} />
          ) : (
            <Branch key={index} name={branch.name} branches={branch.branches} />
          )
        )}
    </SimpleListGroup>
  );
};
