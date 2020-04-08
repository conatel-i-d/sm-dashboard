import React from 'react';
import { SimpleListGroup } from '@patternfly/react-core';


import { BranchCard } from './BranchCard';
import { Leaf } from '../Leaf'
export const Branch = ({ name, branches = [], handleCheckVisible }) => {
  var [open, setOpen] = React.useState(false);

  var handleOnClick = React.useCallback(
    e => {
      e.stopPropagation();
      setOpen(!open);
    },
    [open, setOpen]
  );

  return (
    <SimpleListGroup title={<BranchCard value={{name, isOpen: open, branches}}/>} onClick={handleOnClick}>
      {open &&
        branches.map((branch, index) =>
          branch.type === 'leaf' ? (
            <Leaf key={index} value={branch.value} handleCheckVisible={handleCheckVisible} />
          ) : (
            <Branch key={index} name={branch.name} branches={branch.branches} handleCheckVisible={handleCheckVisible}  />
          )
        )}
    </SimpleListGroup>
  );
};
