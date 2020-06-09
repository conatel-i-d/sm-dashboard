import './tree.css';

import React from 'react';
import { SimpleList } from '@patternfly/react-core';

import Leaf from './Leaf';
import Branch from './Branch';


const Tree = ({ branches, handleCheckVisible }) => {
  // const handleCheckVisible = (id) => {
  //   console.log(getUserRoles())
  // };
  return (
    <SimpleList aria-label="macSearch">
      {branches.length > 0
        ? branches.map((branch, index) =>
            branch.type === 'leaf' ? (
              <Leaf
                key={index}
                value={branch.value}
                handleCheckVisible={handleCheckVisible}
              />
            ) : (
              <Branch
                key={index}
                name={branch.name}
                branches={branch.branches}
                handleCheckVisible={handleCheckVisible}
              />
            )
          )
        : ''}
    </SimpleList>
  );
};

export default Tree;