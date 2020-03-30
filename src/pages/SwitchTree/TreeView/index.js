// import ReactDOM from "react-dom";
// import "@patternfly/react-core/dist/styles/base.css";
// import "./fonts.css";
import './overrides.css';

import React from 'react';
import { SimpleList } from '@patternfly/react-core';

import { Leaf } from './Leaf';
import { Branch } from './Branch';

var treeState = [
  {
    type: 'branch',
    name: 'Branch #1',
    branches: [
      {
        type: 'branch',
        name: 'Branch #3',
        branches: [
          {
            type: 'leaf',
            value: {
              name: 'switch #3 branch #3',
              ip: '33.33.33.33',
              model: 'Cissco 33',
              mac_entries: '3,qwe,22f.sd,23.sds,255'
            }
          }
        ]
      },
      {
        type: 'leaf',
        value: {
          name: 'switch #1 branch #1',
          ip: '11.11.11.11',
          model: 'Cissco 11',
          mac_entries: '1,qwe,22f.sd,23.sds,255'
        }
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
                  name: 'switch #1 branch #2',
                  ip: '21.21.21.21',
                  model: 'Cissco 21',
                  mac_entries: '1,qwe,22f.sd,23.sds,255'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: 'leaf',
    value: {
      name: 'switch #1 branch #3',
      ip: '31.31.31.31',
      model: 'Cissco 31',
      mac_entries: '1,qwe,22f.sd,23.sds,255'
    }
  }
];

export const Tree = ({ branches }) => {
  // console.log(branches);
  return (
    <SimpleList aria-label="SwitchesTree">
      {branches.map((branch, index) =>
        branch.type === 'leaf' ? (
          <Leaf key={index} value={branch.value} />
        ) : (
          <Branch key={index} name={branch.name} branches={branch.branches} />
        )
      )}
    </SimpleList>
  );
};
