import './tree.css';

import React from 'react';
import { SimpleList } from '@patternfly/react-core';

import { Leaf } from './Leaf';
import { Branch } from './Branch';

// Todo: esto debería salirse para documentación
/*
var treeState = [
  {
    type: 'branch',
    name: 'Branch #1',
    branches: [
      {
        type: 'leaf',
        value: {
          id: '2255',
          name: 'switch #1 branch #1',
          ip: '11.11.11.11',
          model: 'Cissco 11'
        }
      },
      {
        type: 'branch',
        name: 'Branch #3',
        branches: [
          {
            type: 'leaf',
            value: {
              id: '355',
              name: 'switch #1 branch #3',
              ip: '31.31.31.31',
              model: 'Cissco 31'
            }
          },
          {
            type: 'leaf',
            value: {
              id: '123',
              name: 'switch #2 branch #3',
              ip: '32.32.32.32',
              model: 'Cissco 32'
            }
          }
        ]
      }
    ]
  },
  {
    type: 'branch',
    name: 'Branch #2',
    branches: [
      {
        type: 'branch',
        name: 'Branch #4',
        branches: [
          {
            type: 'branch',
            name: 'Branch #5',
            branches: [
              {
                type: 'leaf',
                value: {
                  id: '1255',
                  name: 'switch #1 branch #2',
                  ip: '21.21.21.21',
                  model: 'Cissco 21'
                }
              }
            ]
          }
        ]
      }
    ]
  }
];
*/

export const Tree = ({ branches, handleCheckVisible }) => {
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